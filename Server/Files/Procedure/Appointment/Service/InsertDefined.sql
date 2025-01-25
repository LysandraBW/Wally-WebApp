USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertDefinedService;
GO

CREATE PROCEDURE Appointment.InsertDefinedService (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@ServiceID		INT
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	IF (USER_NAME() = 'Customer')
	BEGIN
		EXEC	Appointment.AuthenticateSession 
				@SessionID;
	END;

	DECLARE @Service VARCHAR(50) = (
		SELECT	Service
		FROM	Info.Service
		WHERE	ServiceID = @ServiceID
	);

	DECLARE @Division VARCHAR(50) = (
		SELECT	Division
		FROM	Info.ServiceDivision
		JOIN	Info.Service 
		ON		Info.ServiceDivision.DivisionID = Info.Service.DivisionID
		WHERE	ServiceID = @ServiceID
	);

	DECLARE @Class VARCHAR(50) = (
		SELECT	Class
		FROM	Info.ServiceClass
		JOIN	Info.ServiceDivision
		ON		Info.ServiceClass.ClassID = Info.ServiceDivision.ClassID
		JOIN	Info.Service
		ON		Info.ServiceDivision.DivisionID = Info.Service.DivisionID
		WHERE	ServiceID = @ServiceID
	);

	INSERT INTO Appointment.Service 
	VALUES (
		@AppointmentID, 
		@Class,
		@Division,
		@Service
	);

	IF (USER_NAME() = 'Employee')
	BEGIN
		DECLARE @SessionEmployeeID UNIQUEIDENTIFIER;
		EXEC	Employee.TranslateSessionID
				@SessionID, 
				@SessionEmployeeID OUTPUT;

		DECLARE @M1 VARCHAR(400) = CONCAT('Inserted Service ''', @Service, '''');
		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				@M1;
	END;

	SELECT SCOPE_IDENTITY() AS ServiceID;
	COMMIT TRANSACTION;
END
GO
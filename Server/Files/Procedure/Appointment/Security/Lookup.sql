USE WALTRONICS;
GO

DROP PROCEDURE Appointment.AuthorizeLookup;
GO

CREATE PROCEDURE Appointment.AuthorizeLookup (
	@AppointmentID	UNIQUEIDENTIFIER,
	@Email			VARCHAR(320),
	@SessionID		CHAR(36) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @_AppointmentID UNIQUEIDENTIFIER;
	SELECT	@_AppointmentID = AppointmentID
	FROM	Appointment.ID		AS A
	JOIN	Customer.Customer	AS C
	ON		A.CustomerID		= C.CustomerID
	WHERE	C.Email				= @Email AND
			A.AppointmentID		= @AppointmentID;
			
	IF (@_AppointmentID IS NULL)
	BEGIN
		;THROW 50000, 'APPOINTMENT NOT FOUND', 1;
	END;
	
	DECLARE @_SessionID CHAR(36);
	EXEC Info.SessionID @_SessionID OUTPUT;

	IF (EXISTS(
			SELECT	1 
			FROM	Appointment.Session 
			WHERE	AppointmentID = @AppointmentID
	))
	BEGIN
		UPDATE	Appointment.Session
		SET		SessionID = @_SessionID,
				LoginDate = GETDATE()
		WHERE	AppointmentID = @AppointmentID;
	END;
	ELSE
	BEGIN
		INSERT INTO Appointment.Session
		VALUES (
			@AppointmentID,
			@_SessionID,
			GETDATE()
		);
	END;

	SELECT @SessionID = @_SessionID;
	COMMIT TRANSACTION;
END;
GO
USE WALTRONICS;
GO

DROP PROCEDURE Appointment.GetRepairs;
GO

CREATE PROCEDURE Appointment.GetRepairs (
	@SessionID		CHAR(36) = NULL,
	@AppointmentID	UNIQUEIDENTIFIER
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

	SELECT		RepairID,
				Repair
	FROM		Appointment.Repair
	WHERE		AppointmentID = @AppointmentID
	ORDER BY	RepairID ASC;

	COMMIT TRANSACTION;
END;
GO
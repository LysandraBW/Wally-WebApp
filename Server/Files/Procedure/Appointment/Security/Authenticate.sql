USE WALTRONICS;
GO

DROP PROCEDURE Appointment.AuthenticateSession;
GO

CREATE PROCEDURE Appointment.AuthenticateSession (
	@SessionID		CHAR(36)
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;
	
	DECLARE @SessionAppointmentID UNIQUEIDENTIFIER;
	EXEC	Appointment.TranslateSessionID 
			@SessionID, 
			@SessionAppointmentID OUTPUT;

	COMMIT TRANSACTION;
END;
GO
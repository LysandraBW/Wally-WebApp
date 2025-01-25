USE WALTRONICS;
GO

DROP PROCEDURE Appointment.GetDiagnoses;
GO

CREATE PROCEDURE Appointment.GetDiagnoses (
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

	SELECT		DiagnosisID,
				Code,
				Message
	FROM		Appointment.Diagnosis
	WHERE		AppointmentID = @AppointmentID
	ORDER BY	DiagnosisID ASC;

	COMMIT TRANSACTION;
END;
GO
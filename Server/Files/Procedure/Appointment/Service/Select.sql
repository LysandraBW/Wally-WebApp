USE WALTRONICS;
GO

DROP PROCEDURE Appointment.GetServices;
GO

CREATE PROCEDURE Appointment.GetServices (
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

	SELECT		AppService.Class,
				AppService.Division,
				AppService.Service,
				AppService.AppointmentID,
				AppService.ServiceID AS AppointmentServiceID,
				InfoService.ServiceID AS ServiceID
	FROM		Appointment.Service AppService
	LEFT JOIN	Info.Service InfoService		
	ON			AppService.Service = InfoService.Service
	WHERE		AppointmentID = @AppointmentID
	ORDER BY	Class					ASC,
				Division				ASC,
				InfoService.Service		ASC;

	COMMIT TRANSACTION;
END;
GO
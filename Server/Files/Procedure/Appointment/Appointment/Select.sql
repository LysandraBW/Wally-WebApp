USE WALTRONICS;
GO

DROP PROCEDURE Appointment.Get;
GO

CREATE PROCEDURE Appointment.Get (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @SessionEmployeeID UNIQUEIDENTIFIER;
	EXEC	Employee.TranslateSessionID
			@SessionID, 
			@SessionEmployeeID OUTPUT;

	SELECT		AppointmentID.AppointmentID,
				AppointmentID.CustomerID,
				Customer.Customer.FName,
				Customer.Customer.LName,
				Customer.Customer.Email,
				Customer.Customer.Phone,
				Appointment.Date.CreationDate,
				Appointment.Date.UpdationDate,
				Appointment.Date.StartDate,
				Appointment.Date.EndDate,
				Appointment.Vehicle.Make,
				Appointment.Vehicle.Model,
				Appointment.Vehicle.ModelYear,
				Appointment.Vehicle.VIN,
				Appointment.Vehicle.Mileage,
				Appointment.Vehicle.LicensePlate,
				AppointmentStatus.StatusID,
				InfoStatus.Status,
				Appointment.Cost.Cost
	FROM		Appointment.ID						AS AppointmentID
	JOIN		Customer.Customer											ON	AppointmentID.CustomerID		= Customer.CustomerID
	JOIN		Appointment.Date											ON	AppointmentID.AppointmentID		= Appointment.Date.AppointmentID
	JOIN		Appointment.Vehicle											ON	AppointmentID.AppointmentID		= Appointment.Vehicle.AppointmentID
	JOIN		Appointment.Status					AS AppointmentStatus	ON	AppointmentID.AppointmentID		= AppointmentStatus.AppointmentID
	JOIN		Info.Status							AS InfoStatus			ON	InfoStatus.StatusID				= AppointmentStatus.StatusID
	JOIN		Appointment.Cost											ON	AppointmentID.AppointmentID		= Appointment.Cost.AppointmentID
	WHERE		AppointmentID.AppointmentID = @AppointmentID;

	EXEC	Appointment.GetServices 
			NULL,
			@AppointmentID;

	EXEC	Appointment.GetDiagnoses
			NULL,
			@AppointmentID;

	EXEC	Appointment.GetRepairs
			NULL,
			@AppointmentID;

	EXEC	Appointment.GetParts
			@AppointmentID;

	EXEC	Appointment.GetPayments
			@AppointmentID;

	EXEC	Appointment.GetLabels
			@SessionID,
			@AppointmentID

	EXEC	Appointment.GetEmployeeNotes
			@SessionID,
			@AppointmentID

	COMMIT TRANSACTION;
END;
GO

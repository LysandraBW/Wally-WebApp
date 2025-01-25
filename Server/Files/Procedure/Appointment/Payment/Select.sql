USE WALTRONICS;
GO

DROP PROCEDURE Appointment.GetPayments;
GO

CREATE PROCEDURE Appointment.GetPayments (
	@AppointmentID	UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	SELECT		Appointment.Payment.PaymentID,
				Appointment.Payment.PaymentDate,
				Appointment.Payment.Payment,
				Appointment.CreditCard.CCN,
				Appointment.CreditCard.EXP,
				Appointment.CreditCard.Name,
				Appointment.CreditCard.Type
	FROM		Appointment.Payment
	LEFT JOIN	Appointment.CreditCard
	ON			Appointment.Payment.PaymentID = Appointment.CreditCard.PaymentID
	WHERE		Appointment.Payment.AppointmentID = @AppointmentID
	ORDER BY	Appointment.Payment.PaymentDate;

	COMMIT TRANSACTION;
END;
GO
USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertDigitalPayment;
GO

CREATE PROCEDURE Appointment.InsertDigitalPayment (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@Payment		MONEY,
	@Name			VARCHAR(100),
	@Type			VARCHAR(10),
	@CCN			CHAR(3),
	@EXP			CHAR(4)
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

	DECLARE @PaymentID INT;
	EXEC Appointment.InsertPayment @SessionID, @AppointmentID, @Payment, @PaymentID OUTPUT;

	PRINT @PaymentID;
	
	EXEC Appointment.InsertCreditCard @SessionID, @AppointmentID, @PaymentID, @Name, @Type, @CCN, @EXP

	COMMIT TRANSACTION;
END;
GO

EXEC Appointment.InsertDigitalPayment '0A8641A9-6C63-44C1-AFE4-FACEA5920A67', 'B3B6F304-4E49-EF11-A394-30F6EF05027A', 30, 'Name', 'VISA', '000', '0000';
SELECT * FROM Appointment.CreditCard;
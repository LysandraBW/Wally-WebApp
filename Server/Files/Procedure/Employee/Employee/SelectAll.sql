USE WALTRONICS;
GO

DROP PROCEDURE Employee.GetAll;
GO

CREATE PROCEDURE Employee.GetAll (
	@SessionID	CHAR(36)
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	EXEC	Employee.AuthenticateSession 
			@SessionID

	SELECT	Employee.EmployeeID,
			Employee.FName,
			Employee.LName
	FROM	Employee.Employee;

	COMMIT TRANSACTION;
END;
GO
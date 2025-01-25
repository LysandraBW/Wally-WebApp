USE WALTRONICS;
GO

DROP PROCEDURE Employee.Get;
GO

CREATE PROCEDURE Employee.Get (
	@SessionID	CHAR(36)
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @SessionEmployeeID CHAR(36);
	EXEC	Employee.TranslateSessionID
			@SessionID,
			@SessionEmployeeID OUTPUT;

	SELECT	Employee.Employee.EmployeeID,
			Employee.Employee.FName,
			Employee.Employee.LName,
			Employee.Employee.Email,
			Employee.Employee.Phone
	FROM	Employee.Employee
	WHERE	Employee.Employee.EmployeeID = @SessionEmployeeID;

	COMMIT TRANSACTION;
END;
GO
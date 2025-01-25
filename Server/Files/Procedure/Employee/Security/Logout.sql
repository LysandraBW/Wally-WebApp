USE WALTRONICS;
GO

DROP PROCEDURE Employee.LogoutEmployee;
GO

CREATE PROCEDURE Employee.LogoutEmployee (
	@SessionID CHAR(36)
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

	DELETE FROM	Employee.Session
	WHERE		SessionID = @SessionID AND
				EmployeeID = @SessionEmployeeID;

	COMMIT TRANSACTION;
END;
GO
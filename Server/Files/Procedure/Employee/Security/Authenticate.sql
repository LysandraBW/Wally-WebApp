USE WALTRONICS;
GO

DROP PROCEDURE Employee.AuthenticateSession;
GO

CREATE PROCEDURE Employee.AuthenticateSession (
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

	COMMIT TRANSACTION;
END;
GO
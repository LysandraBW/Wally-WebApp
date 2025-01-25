USE WALTRONICS;
GO

DROP PROCEDURE Employee.LoginEmployee;
GO

CREATE PROCEDURE Employee.LoginEmployee (
	@Username	VARCHAR(50),
	@Password	VARCHAR(50),
	@SessionID	CHAR(36) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE	@EmployeeID UNIQUEIDENTIFIER = (
		SELECT	EmployeeID
		FROM	Employee.Login
		WHERE	Username = @Username AND
				Password = CONVERT(VARCHAR(255), HASHBYTES('SHA2_256', @Password))
	);

	IF (@EmployeeID IS NULL)
	BEGIN
		;THROW 50000, 'EMPLOYEE NOT FOUND', 1;
	END;

	DECLARE @_SessionID CHAR(36);
	EXEC Info.SessionID @_SessionID OUTPUT;

	IF (EXISTS(
			SELECT	1 
			FROM	Employee.Session 
			WHERE	EmployeeID = @EmployeeID
	))
	BEGIN
		UPDATE	Employee.Session
		SET		SessionID = @_SessionID,
				LoginDate = GETDATE()
		WHERE	EmployeeID = @EmployeeID;
	END;
	ELSE
	BEGIN
		INSERT INTO Employee.Session
		VALUES (
			@EmployeeID,
			@_SessionID,
			GETDATE()
		);
	END;

	SELECT @SessionID = @_SessionID;
	COMMIT TRANSACTION;
END;
GO
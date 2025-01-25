USE WALTRONICS;
GO

-- CREATE ROLE Standard;

REVOKE	ALTER,
		DELETE,
		EXECUTE,
		INSERT,
		SELECT,
		UPDATE,
		REFERENCES
TO		Standard;

GRANT	EXEC
ON		Schema::Info
TO		Standard;

GRANT	EXEC
ON		Appointment.InsertAppointment
TO		Standard;

GRANT	EXEC
ON		Appointment.InsertDefinedService
TO		Standard;

GRANT	EXEC
ON		Appointment.AuthorizeLookup
TO		Standard;

GRANT	EXEC
ON		Appointment.AuthenticateSession
TO		Standard;

GRANT	EXEC
ON		Employee.LoginEmployee
TO		Standard;

GRANT	EXEC
ON		Employee.AuthenticateSession
TO		Standard;

ALTER ROLE Standard
ADD MEMBER User_Standard;
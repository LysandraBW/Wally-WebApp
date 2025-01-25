USE WALTRONICS;
GO

DROP TABLE Appointment.Deleted;

CREATE TABLE Appointment.Deleted (
	AppointmentID UNIQUEIDENTIFIER NOT NULL,
	PRIMARY KEY (AppointmentID)
);

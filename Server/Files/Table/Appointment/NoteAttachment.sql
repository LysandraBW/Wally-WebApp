USE WALTRONICS;
GO

DROP TABLE Appointment.NoteAttachment;

CREATE TABLE Appointment.NoteAttachment (
	AttachmentID	INT	NOT NULL IDENTITY (1,1),
	NoteID			INT	NOT NULL,
	Name			VARCHAR(100),
	URL				VARCHAR(2048) CHECK (LEN(URL) > 1),
	FOREIGN KEY (NoteID) REFERENCES Appointment.Note (NoteID) ON DELETE CASCADE
);
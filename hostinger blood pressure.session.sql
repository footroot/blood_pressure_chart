CREATE TABLE blood_pressure_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    systolic INT NOT NULL,
    diastolic INT NOT NULL,
    pulse INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);
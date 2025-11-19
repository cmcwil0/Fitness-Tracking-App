USE fitnessapp;

INSERT INTO users (username, email, password_hash, role)
VALUES (
  'admin',
  NULL,
  '$2a$12$uy/h0iFwwR3kKWBbnL3s9uO9SznYwi1eNFbVDFR.HAl43Y1UQDQA.',
  'admin'
)
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  role = VALUES(role);
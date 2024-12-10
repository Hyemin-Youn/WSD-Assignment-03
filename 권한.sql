SELECT user, host FROM mysql.user WHERE user = 'yhm';
GRANT ALL PRIVILEGES ON *.* TO 'yhm'@'%' IDENTIFIED BY 'MySQL@Secure02';
FLUSH PRIVILEGES;

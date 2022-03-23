###  Run the following commands to create the Certificate Signing Request (CSR) and a new Key file:
 
``` 
openssl req -new -out ehpr.csr -newkey rsa:2048 -nodes -sha256 -keyout ehpr.key -config req.conf
```
	
### Run the following command to verify the Certificate Signing Request:
 
```
openssl req -text -noout -verify -in ehpr.csr
```

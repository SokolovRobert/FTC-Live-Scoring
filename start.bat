set ip_address_string="IP Address"
rem Uncomment the following line when using Windows 7 or Windows 8 / 8.1 (with removing "rem")!
set ip_address_string="IPv4 Address"
for /f "usebackq tokens=2 delims=:" %%f in (`ipconfig ^| findstr /c:%ip_address_string%`) do (
    echo Your IP Address is: %%f:8080
    echo var ip ="%%f:8080"; > FTC-Live-Scoring/src/static/js/local.js
    echo Go to the address listed above, you may need to add http:// in front.
    goto :eof
)






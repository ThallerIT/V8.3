# JPETo™
JPETo™ Application Framework for PHP 8.x

Wir benötigen diverse externe Libraries, die in ein gemeinsames Verzeichnis "Library", parallel zu jpeto-sys eingespielt werden.
Name und Pfad sind frei wählbar, müssen aber dann ggf weiter unten jeweils angepasst werden.

## Externe Libraries von git clonen

```bash
cd Library

#constant_time_encoding
git clone https://github.com/paragonie/constant_time_encoding.git

#dompdf
git clone https://github.com/dompdf/dompdf.git

#iCalcreator
git clone https://github.com/iCalcreator/iCalcreator.git

#krumo
git clone https://github.com/kktsvetkov/krumo.git

#laminas-escaper
git clone https://github.com/laminas/laminas-escaper.git

#OAuth2
git clone https://github.com/adoy/PHP-OAuth2.git

#OpenID-Connect-PHP
git clone https://github.com/jumbojett/OpenID-Connect-PHP.git

#php-enum
git clone https://github.com/myclabs/php-enum.git

#php-iban
git clone https://github.com/globalcitizen/php-iban.git

#phpmailer
git clone https://github.com/PHPMailer/PHPMailer.git

#PhpOffice and dependencies
git clone https://github.com/PHPOffice/Common.git
git clone https://github.com/PHPOffice/PhpSpreadsheet.git
git clone https://github.com/PHPOffice/PHPPresentation.git
git clone https://github.com/PHPOffice/PHPWord.git
git clone https://github.com/php-fig/simple-cache.git
git clone https://github.com/php-fig/http-message.git

#phpseclib
git clone https://github.com/phpseclib/phpseclib.git

#SimpleCache
git clone https://github.com/php-fig/simple-cache.git

#ZipStream-PHP
git clone https://github.com/maennchen/ZipStream-PHP.git
```
## Symbolic Links
Um die Libraries einsetzen zu können, werden symbolic links werden im Verzeichnis jpeto-sys/jpeto erstellt:

```bash
cd /jpeto-sys/jpeto

#constant_time_encoding verlinken
ln -s ../../Library/constant_time_encoding/src/ ./constant_time_encoding

#dompdf verlinken
ln -s ../../Library/dompdf/src/ ./dompdf
ln -s ../../Library/dompdf/lib/ .

#httpmessage verlinken
ln -s ../../Library/http-message/src/ ./http-message

#iCalcreator verlinken
mkdir iCalcreator
cd iCalcreator
ln -s ../../../Library/iCalcreator/autoload.php .
ln -s ../../../Library/iCalcreator/src/ .
cd ..

#krumo verlinken
ln -s ../../Library/krumo/ .

#laminas-escaper verlinken
ln -s ../../Library/laminas-escaper/src/ ./laminas-escaper

#OAuth2 verlinken
ln -s ../../Library/PHP-OAuth2/src/OAuth2/ .

#OpenID-Connect-PHP verlinken
ln -s ../../Library/OpenID-Connect-PHP/src/ ./OpenID-Connect-PHP

#php-enum verlinken
ln -s ../../Library/php-enum/src/ ./Enum

#php-iban verlinken
mkdir php-iban
cd php-iban
ln -s ../../../Library/php-iban/php-iban.php .
ln -s ../../../Library/php-iban/registry.txt .
cd ..

#phpmailer verlinken
mkdir phpmailer
cd phpmailer
ln -s ../../../Library/PHPMailer/LICENSE .
ln -s ../../../Library/PHPMailer/src/ .
cd ..

#PhpOffice verlinken
mkdir PhpOffice
cd PhpOffice
ln -s ../../../Library/PhpOffice/Common/src/Common/ .
ln -s ../../../Library/PhpOffice/PHPPresentation/src/PhpPresentation/ .
ln -s ../../../Library/PhpOffice/PhpSpreadsheet/src/PhpSpreadsheet/ .
ln -s ../../../Library/PhpOffice/PHPWord/src/PhpWord/ .
mkdir Psr
cd Psr
ln -s ../../../../Library/simple-cache/src/ SimpleCache
mkdir Http
cd Http
ln -s ../../../../../Library/http-message/src/ Message
cd ..
cd ..
cd ..

#phpseclib verlinken
ln -s ../../Library/phpseclib/phpseclib/ .

#ZipStream-PHP verlinken
mkdir ZipStream
cd ZipStream
ln -s ../../../Library/ZipStream-PHP/src/Autoloader.php .
ln -s ../../../Library/ZipStream-PHP/src/Bigint.php .
ln -s ../../../Library/ZipStream-PHP/src/DeflateStream.php .
ln -s ../../../Library/ZipStream-PHP/src/Exception .
ln -s ../../../Library/ZipStream-PHP/src/Exception.php .
ln -s ../../../Library/ZipStream-PHP/src/File.php .
ln -s ../../../Library/ZipStream-PHP/src/Option .
ln -s ../../../Library/ZipStream-PHP/src/Stream.php .
ln -s ../../../Library/ZipStream-PHP/src/ZipStream.php .
cd ..
```

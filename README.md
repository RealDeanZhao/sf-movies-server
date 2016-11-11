# sf-movies-server

import the data, need to change the name of the CSV header first. Also you will need to install rethinkdb python driver first.
```
➜  sf-movies-server git:(master) ✗ rethinkdb import -f data-export.csv --table test.Movie --pkey id --format csv
[========================================] 100% 
1586 rows imported in 1 table
  Done (0 seconds)
```
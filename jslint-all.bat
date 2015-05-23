@rem Relies on jslint existing as a command, e.g. a batch file that calls
@rem the node.js jslint module - "node xxx\node_modules\jslint\bin\jslint.js"

@rem This version missed subdirs:
@rem for /r %%i in (site\js\*.js) do @jslint "%%i"

@for /f "delims=" %%i in ('dir /s/b site\js\*.js') do @jslint "%%i"

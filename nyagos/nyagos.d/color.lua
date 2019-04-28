if not nyagos then
    print("This is a script for nyagos not lua.exe")
    os.exit()
end

nyagos.alias.color = function()
    nyagos.prompt('$e[40;31mred      $e[1mred      $e[41;32mred     $_')
    nyagos.prompt('$e[40;32mgreen    $e[1mgreen    $e[42;31mgreen   $_')
    nyagos.prompt('$e[40;33myellow   $e[1myellow   $e[43;34myellow  $_')
    nyagos.prompt('$e[40;34mblue     $e[1mblue     $e[44;33mblue    $_')
    nyagos.prompt('$e[40;35mmagenta  $e[1mmagenta  $e[45;36mmagenta $_')
    nyagos.prompt('$e[40;36mcyan     $e[1mcyan     $e[46;35mcyan    $_')
    nyagos.prompt('$e[40;37mwhite    $e[1mwhite    $e[47;30mwhite   $_')
end

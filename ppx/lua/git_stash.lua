if not nyagos then
    print("This is a script for nyagos not lua.exe")
    os.exit()
end

local sb = nyagos.exec("git stash list | peco | sed -r 's/stash@{([0-9]*)}.*/\1/'")
if sb == "" then
    return nil
end

nyagos.exec("git stash apply "..sb)

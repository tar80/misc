if not nyagos then
    print("This is a script for nyagos not lua.exe")
    os.exit()
end

-- local sc = nyagos.eval("git log --all --date=short --format=\"%h %ad *%s%d\" -60 | fzf --layout=reverse --height=100 | awk '{ print $1 }'")
local sc = nyagos.eval("git log --all --date=short --format=\"%h %ad *%s%d\" -60 | peco | awk '{ print $1 }'")
if sc == "" then
    return nil
end

nyagos.exec(arg[1]..'PPTRAYW.EXE -c *addhistory g,' .. sc)

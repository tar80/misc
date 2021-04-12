if not nyagos then
    print("This is a script for nyagos not lua.exe")
    os.exit()
end

local path = arg[2] == nil and "" or arg[2]

local sc = nyagos.eval("git log --all --date=short --format=\"%h %ad *%s%d\" -60 -- "..path.."| peco | awk '{ print $1 }'")
if sc == "" then
    return nil
end

nyagos.exec(arg[1]..'PPTRAYW.EXE -c *execute C,*string i,selecthash='..sc)

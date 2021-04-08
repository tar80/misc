if not nyagos then
    print("This is a script for nyagos not lua.exe")
    os.exit()
end

-- local sb = nyagos.eval("git branch | fzf --layout=reverse --height=100")
local sb = nyagos.eval("git branch | peco")
if sb == "" then
    return nil
end

nyagos.exec(arg[1]..'PPTRAYW.EXE -c *execute C,*string i,selectbranch=' .. sb)

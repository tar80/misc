if not nyagos then
    print("This is a script for nyagos not lua.exe")
    os.exit()
end

-- local sb = nyagos.eval("git branch | fzf --layout=reverse --height=100")
-- local sb = nyagos.eval("git branch | peco")
-- if sb == "" then
--     return nil
-- end

local test = arg[1]
nyagos.write(test)

-- nyagos.exec(args[1] .. 'PPTRAYW.EXE -c *addhistory g,' .. sb)

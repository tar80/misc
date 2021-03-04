if not nyagos then
    print("This is a script for nyagos not lua.exe")
    os.exit()
end

local sb = nyagos.eval("git branch | peco")
if sb == "" then
    return nil
end
local res = nyagos.eval("git checkout " .. sb)

function Get_si()
    local u, o = "", ""
    if res ~= "" then
        local gitroot = nyagos.eval("git rev-parse --show-toplevel")
        local myrepo = string.gsub(arg[1], "\\", "/")
        if myrepo == gitroot then
            u = "*setcust _User:u_git_branch=" .. sb .. "%:"
        end
        if arg[2] ~= nil then
            o = "*execute C,*string i,oBRANCH=" .. sb
        end
        return {u, o}
    end
end

local si = Get_si()
nyagos.exec("c:/bin/ppx/PPTRAYW.EXE -c " .. si[1] .. si[2])

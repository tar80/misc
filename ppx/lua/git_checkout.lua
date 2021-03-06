if not nyagos then
    print("This is a script for nyagos not lua.exe")
    os.exit()
end

local sb = nyagos.eval("git branch | peco")
if sb == "" then
    return nil
end

local gc = nyagos.exec("git checkout " .. sb)
if gc == 0 then
    function Get_si()
        local u, o = "", ""
        if sb ~= "" then
            local gitroot = nyagos.eval("git rev-parse --show-toplevel")
            local myrepo = string.gsub(arg[1], "\\", "/")
            if myrepo == gitroot then
                u = "*setcust _User:u_git_branch=" .. sb .. " %:"
            end
            if arg[2] ~= nil then
                o = "*execute C,*string i,oBranch=" .. sb
            end
            return {u, o}
        end
    end

    local si = Get_si()
    nyagos.exec("c:/bin/ppx/PPBW.EXE -c " .. si[1] .. si[2])

    os.exit()
end

import sys
import telnetlib
import time
Host='172.28.248.53'
user = 'cisco'
password = 'cisco123'

tn = telnetlib.Telnet(Host)

tn.read_until(b"Username: ")
tn.write(user.encode('ascii') + b"\n")


tn.read_until(b"Password: ")
tn.write(password.encode('ascii') + b"\n")

tn.write(b"config t\n")
tn.write(b"\n")
tn.write(b"interface gig 1/0/4\n")
tn.write(b"switchport access vlan 20\n")
tn.write(b"interface gig 1/0/8\n")
tn.write(b"switchport access vlan 10\n")
tn.write(b"interface gig 1/0/1\n")
tn.write(b"switchport access vlan 20\n")
tn.write(b"interface gig 1/0/3\n")
tn.write(b"switchport access vlan 20\n")
tn.write(b"interface gig 1/0/5\n")
tn.write(b"switchport access vlan 20\n")
tn.write(b"interface gig 1/0/7\n")
tn.write(b"switchport access vlan 10\n")
tn.write(b"interface gig 1/0/9\n")
tn.write(b"switchport access vlan 60\n")
tn.write(b"interface gig 1/0/11\n")
tn.write(b"switchport access vlan 60\n")
tn.write(b"interface gig 1/0/13\n")
tn.write(b"switchport access vlan 10\n")
tn.write(b"interface gig 1/0/15\n")
tn.write(b"switchport access vlan 60\n")
tn.write(b"interface gig 1/0/17\n")
tn.write(b"switchport access vlan 10\n")
tn.write(b"interface gig 1/0/19\n")
tn.write(b"switchport access vlan 20\n")

tn.write(b"end\n")
tn.write(b"wr\n")
tn.write(b"exit\n")
line = tn.read_all()
print(line)
Host='172.28.248.55'
user = 'cisco'
password = 'cisco123'

tn = telnetlib.Telnet(Host)

tn.read_until(b"Username: ")
tn.write(user.encode('ascii') + b"\n")


tn.read_until(b"Password: ")
tn.write(password.encode('ascii') + b"\n")

tn.write(b"config t\n")
tn.write(b"\n")
tn.write(b"interface gig 1/0/1\n")
tn.write(b"switchport access vlan 70\n")
tn.write(b"interface gig 1/0/2\n")
tn.write(b"switchport access vlan 70\n")

tn.write(b"end\n")
tn.write(b"wr\n")
tn.write(b"exit\n")
line = tn.read_all()
print(line)
Host='172.28.248.56'
user = 'cisco'
password = 'cisco123'

tn = telnetlib.Telnet(Host)

tn.read_until(b"Username: ")
tn.write(user.encode('ascii') + b"\n")


tn.read_until(b"Password: ")
tn.write(password.encode('ascii') + b"\n")

tn.write(b"config t\n")
tn.write(b"\n")
tn.write(b"interface gig 1/0/2\n")
tn.write(b"switchport access vlan 1\n")
tn.write(b"interface gig 1/0/4\n")
tn.write(b"switchport access vlan 1\n")
tn.write(b"interface gig 1/0/6\n")
tn.write(b"switchport access vlan 1\n")

tn.write(b"end\n")
tn.write(b"wr\n")
tn.write(b"exit\n")
line = tn.read_all()
print(line)

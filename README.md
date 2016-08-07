# About This Project
AptPackageShow is an experiment in throwing up a web interface in front of the apt-cache tool.

# Prerequisites
1.  Vagrant
2.  Ansible
3.  Virtualbox
4.  Some form of 64-bit Ubuntu or a derivitive therein.

# How To Install
1.  git clone https://github.com/pcote/AptPackageShow.git
2.  Open up /etc/hosts and add this line:  
<b>127.0.0.1       aptpackageshow.com</b>
3.  cd over to the AptPackageShow directory created by your clone operation.
4.  type: <b>vagrant up</b>
5.  Wait patiently as Vagrant does it's job of creating and provisioning the server.
6.  When done, type this into your browser and hit enter: http://localhost:8080/

# Warning

This project is not intended for production use.  It does spin up processes inside the VM which utilizes shell access.  
Stuff typed in by users are used as parameters to those processes.  This project is intended for localhost only.
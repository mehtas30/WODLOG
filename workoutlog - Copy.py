# -*- coding: utf-8 -*-
"""
Created on Sat Aug  8 14:53:45 2020
What it is: takes user input and puts into textfile 
goal: display in console, open without launching spyder. 
@author: Samarth Mehta
"""
from datetime import date
from tkinter import *
#from tkinter import ttk
root = Tk()#root window
root.title("Workout Log")
today = date.today()
#log=open('workLog.txt','a')
global sendLine
workoutList=[]
#textBox= Entry(root, width= 50)
#textBox.pack()
class gui:
    def __init__(self, master):       
        self.readButt= Button(master, text="read", command=show)
        self.readButt.config(height=15, width=100)
        self.readButt.grid(row=0,column=0)
        self.entries= []
        self.ins= []
        self.logButton= Button(master, text= "log", command=yee)
        self.logButton.config(height=15, width=100)
        self.logButton.grid(row=1,column=0)
       

    def displayLabel(self, master,sendLine):
        global disLabel
        global backButton
        self.logButton.grid_forget()
        self.readButt.grid_forget()
        self.disLabel= Label(master, text= sendLine)
        self.disLabel.grid( row=1, column=1)
        self.textBox= Text(self.disLabel)
        self.textBox.grid( row=1, column=1)
        self.backButton=Button(master, text= "back", command= self.backMethod)
        self.backButton.grid(row=0, column=0)
        self.scroll=Scrollbar(self.disLabel, orient=VERTICAL)
        self.textBox.config(yscrollcommand=self.scroll.set)
        self.scroll.grid(row=1, column=2)
        self.textBox.insert(END, sendLine)
        
    def backMethod(self):
        self.logButton.grid(row=1,column=0)
        self.readButt.grid(row=0,column=0)
        self.disLabel.grid_forget()
        self.backButton.grid_forget()
    
    def backMethodE(self):
        a=0
        for a in range (4):
            self.entries[a].grid_forget()
            self.ins[a].grid_forget()
        self.enterButton.grid_forget()
        self.backButtonE.grid_forget()
        self.logButton.grid(row=1,column=0)
        self.readButt.grid(row=0,column=0)
    
    def enterMethod(self):
        print("*** Enter was pressed ***")
        a=0
        for a in range (4):
            self.entries[a].grid_forget()
            self.ins[a].grid_forget()
        self.logButton.grid(row=1,column=0)
        self.readButt.grid(row=0,column=0)        
        self.enterButton.grid_forget()
        self.backButtonE.grid_forget()
        self.des=str(self.entries[0].get()+','+self.entries[1].get()+','+self.entries[2].get()+','+self.entries[3].get())
        logStuff(self.des)
        print("*** Enter method complete ***")
        
    def getInput(self,master):
        print("*** getting input ***" )
        self.readButt.grid_forget()
        self.logButton.grid_forget()
        self.prompts=["wod name:","reps:", "time to complete:", "extra info:"]
        self.entries.clear()
        self.ins.clear()
        for x in range (4):
            self.inputEntry= Entry(master)
            self.inputEntry.grid(row=1,column=x)
            self.entries.append(self.inputEntry)
            self.instruction=Label(master, text=self.prompts[x])
            self.instruction.grid(row=0,column=x)
            self.ins.append(self.instruction)
        print (x)
        self.enterButton=Button(master, text="enter", command=self.enterMethod)
        self.enterButton.grid(row=0, column=7)
        self.backButtonE=Button(master, text= "back", command= self.backMethodE)
        self.backButtonE.grid(row=2, column=0)
        print("*** finished getting input. returning self.des ***")
    
    
class workout: 
    def __init__(self, stamp, name, work,toc,extra ):
        self.stamp=stamp
        self.name=name
        self.work=work
        self.toc=toc
        self.extra=extra
def logStuff(des):
       log=open('workLog.txt','a')
       description=list(des.split(","))
       b=workout(today.strftime("%d/%m/%Y"),description[0], description[1], description[2], description[3])
    #workoutList.append(workout (today.strftime("%d/%m/%Y"), description[0], description[1], description[2], description[3]))
       line='\ndate: '+b.stamp+'\n'+ 'extra notes:' +b.extra+ '\n'+'time to complete: '+b.toc+'\n'+'reps: '+b.work+'\n'+'name:' +b.name
       log.write(line)
       log.close() 
def yee():
    run.getInput(root)

def show():
    prevWods= open('workLog.txt','r') 
    sendLine=""
    lines=prevWods.readlines()
    for line in reversed(lines):
        sendLine+=(line+"\n")
    #sendLine=listTransfer(str(workoutList), sendLine)
    run.displayLabel(root, sendLine)
    prevWods.close()
run= gui(root)    
root.mainloop()    

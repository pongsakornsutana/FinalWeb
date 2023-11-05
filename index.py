from re import fullmatch
from string import hexdigits
from unicodedata import name
from flask import Flask ,render_template,url_for,redirect,request,session
# Create mysql connector to server
import mysql.connector as mysql
# File and Directory/
import os 
# Hash Function md5()
import hashlib 
import random
import datetime

conn = mysql.connect(
    host = 'localhost',
    user = 'root',
    password = 'Tui@_080',
    port = 3307,
    database = 'projectwebpro'
)

app = Flask(__name__)
template_folder = os.path.join(os.path.dirname(__file__),"templates/")
app.static_folder = 'static'
app.static_url_path ='/CSS'

app.secret_key = "WAGWAN"


@app.route('/',methods = ["GET","POST"])
def index():
    session["user"] = ''
    session['audit'] = False
    return render_template('login.html')

@app.route('/login', methods=["GET","POST"])
def sign_in():
    return redirect('/')

@app.route('/checkLogin', methods=["GET","POST"])
def validate_sign_in():
    user = request.form['username']
    password = request.form['password'] 
    username = session['user']
   
    
    try: 
       if user != "" and password !="":
          conn.reconnect()
          cur = conn.cursor()
          sql = '''
              SELECT password FROM username
              WHERE username=%s and audit=1
          '''
          val = (user,) #tuple
          cur.execute(sql,val) 
          data = cur.fetchone() #1 record
          app.logger.info('Usere login',val)
          conn.close()

  
          if  password == data[0]:
            session['user'] = user
            session['audit'] = True
            return render_template('main.html',username = user)
          else:
            return render_template('login.html')
        
       else:
          return render_template('login.html')
    except: 
     return redirect('/login')


    



@app.route('/register',methods = ["GET","POST"])
def register():
    return render_template('register.html')




@app.route('/validate-register',methods = ["GET","POST"])
def validate_register():
    fname = request.form['Firstname']
    email = request.form['Email']
    user = request.form['Username']
    password = request.form['Password']
    cfpassword = request.form['Confirmedpassword']
    msg ="Password not match Try ttry again!!"

    # if password != cfpassword:
    #     msg ="Password not match Try ttry again!!"
    #     return render_template('register.html',msg = msg)

    if fname !='' and user !='':
        conn.reconnect()
        cur = conn.cursor()
        sql_insert = '''
                INSERT INTO username(username,password,fullname,audit,email)
                VALUES(%s,%s,%s,%s,%s)
        '''
        val = (user,password,fname,1,email)
        cur.execute(sql_insert,val)
        conn.commit()
        app.logger.info('New user register',val)
        conn.close()

        return render_template('login.html')

    else:
        return redirect('/register')


@app.route('/showpopup',methods = ["GET","POST"])
def show_popup():
    com = request.form['comment']

    conn.reconnect()
    cur = conn.cursor()
    sql_insert = '''
            INSERT INTO comment(comment)
            VALUES(%s)
    '''
    val = (com,)
    cur.execute(sql_insert,val)
    conn.commit()
    app.logger.info('New recommentation',val)
    conn.reconnect()
    return render_template('recomment_success.html')
    

@app.route('/main', methods=["GET","POST"])
def main():
        username = session['user']
        conn.reconnect()
        cur = conn.cursor()
        sql = '''
                SELECT password FROM username
                WHERE username=%s and audit=1
            '''
        val = (username,) 
        cur.execute(sql, val)
        data = cur.fetchone() 
        conn.close()
         
        return render_template('main.html',username=username)


    

@app.route('/sign-out', methods=["GET","POST"])
def sign_out():
    session.pop('user',None)
    session.pop('audit',None)
    return redirect('/login')




if __name__=='__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)
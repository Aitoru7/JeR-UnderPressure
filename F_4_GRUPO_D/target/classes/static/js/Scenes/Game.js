import Player from "../Clasess/Player.js";
import Averias from "../Clasess/Averias.js";
import Employer from "../Clasess/Employer.js";
var conn;
var conn2;
var conn3;
var conn4;
var timer;
var timer2;
var timer3;
var keyW;
var keyA;
var keyD;
var keyE;
var keyPeriod;
var player1;
var player2;
var averias;
var missions1;
var missions2;
var timep1;
var timep2;
var button1;
var button2;
var collider;
var cursors;
var text1;
var text2;
var timeelapsed;
var posi;
var av1;
var av2;
var av3;
var global;
var finalmalo;
var final1;
var final2;
var tiempoJ1;
var tiempoJ2;
var tiempoJ1_2;
var tiempoJ2_2;
var tiempoJ1_3;
var tiempoJ2_3;
export default class Game extends Phaser.Scene{
    constructor(){
        super({key: 'Game'})
    } 
    init(connection){
		finalmalo = false;
		final1 = false;
		final2 = false;
		global = this;
		av1 = 0;
		av2 = 0;
		av3 = 0;
		conn2 = new WebSocket('ws://' + window.location.hostname + ':8080/movimiento');
		conn3 = new WebSocket('ws://' + window.location.hostname + ':8080/numeros');
		conn4 = new WebSocket('ws://' + window.location.hostname + ':8080/misiones');
		conn=connection.Web;
        collider;
        posi;
        //combo = this.input.keyboard.createCombo();
        timep1 = 3000;
        timep2 = 3000;
        button1;
        button2;
        this.platforms;
        av1 = 0;
        av2 = 0;
        av3 = 0;
        timeelapsed = 0;
        this.error= 500;
        averias = [];
        missions1=[];
        missions2=[];
        //Math.round(Math.random() * (averias.length - 0) + 0);
        timer = this.time.addEvent({callback: () => {player2.setAcceleration(0), player1.setAcceleration(0)}, delay: 1000, callbackScope: this, loop: true}); 
        timer2 = this.time.addEvent({callback: () => {keyW.enabled=true, keyA.enabled=true, keyD.enabled=true, button1.setVisible(false), player1.body.enable = true}, delay: Math.round(Math.random() * (8500 - 3000) + 3000), callbackScope: this, loop: true});    
        timer3 = this.time.addEvent({callback: () => {cursors.enabled = true, button2.setVisible(false), player2.body.enable = true}, delay: Math.round(Math.random() * (8500 - 3000) + 3000), callbackScope: this, loop: true});          
        this.wallpaper;
        cursors = this.input.keyboard.createCursorKeys();
        keyW =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyPeriod = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
    }
    preload(){
        this.load.spritesheet('robot1', 'Assets/andar-sheet1.png', { frameWidth: 40, frameHeight: 50 });
        this.load.spritesheet('robot2', 'Assets/andar-sheet.png', { frameWidth: 40, frameHeight: 50 });
        this.load.spritesheet('plantani', 'Assets/planta-sheet.png', { frameWidth: 60, frameHeight: 120 });
        this.load.spritesheet('employee', 'Assets/trabajador-sheet.png', { frameWidth: 56, frameHeight: 64 });
        this.load.spritesheet('printerAnim', 'Assets/impresora-sheet.png', { frameWidth: 140, frameHeight: 100 });
        this.load.spritesheet('bookshelfAnim', 'Assets/libreria-sheet.png', { frameWidth: 120, frameHeight: 120 });
        this.load.image('stop1', 'Assets/player1.png');
        this.load.image('stop2', 'Assets/player2.png');
        this.load.image('building', 'Assets/edificio.png');
        this.load.image('sky', 'Assets/fondoDia.png');
        this.load.image('wall2', 'Assets/paredP2.png');
        this.load.image('wall1', 'Assets/paredP1.png');
        this.load.image('wall0', 'Assets/paredP0.png');
        this.load.image('interaction', 'Assets/botonInteraccionE.png');
        this.load.image('interaction2', 'Assets/botonInteraccionPunto.png' )
        this.load.image('platform2C', 'Assets/plataformaCentralP2.png');
        this.load.image('platform2L', 'Assets/plataformaLateralP2.png');
        this.load.image('platform1C', 'Assets/plataformaCentralP1.png');
        this.load.image('platform1L', 'Assets/plataformaLateralP1.png');
        this.load.image('platform0', 'Assets/plataformaP0.png');
        this.load.image('separator1', 'Assets/separadorP0.png');
        this.load.image('separator2', 'Assets/separadorP1.png');
        this.load.image('ceiling', 'Assets/techo.png');
        this.load.image('plant', 'Assets/planta.png');
        this.load.image('cloud', 'Assets/nube.png');
        this.load.image('sky0', 'Assets/fondoDia.png');
        this.load.image('paint', 'Assets/cuadro.png');
        this.load.image('printer', 'Assets/impresora.png');
        this.load.image('bookshelf', 'Assets/libreria.png');
        this.load.image('missionj1', 'Assets/flechaJ1.png');
        this.load.image('missionj2', 'Assets/flechaJ2.png');
        this.load.image('tiempoJ1', 'Assets/tiempoJ1.png');
        this.load.image('tiempoJ1_2', 'Assets/tiempoJ1_2.png');
        this.load.image('tiempoJ1_3', 'Assets/tiempoJ1_3.png');
        this.load.image('tiempoJ2', 'Assets/tiempoJ2.png');
        this.load.image('tiempoJ2_2', 'Assets/tiempoJ2_2.png');
        this.load.image('tiempoJ2_3', 'Assets/tiempoJ2_3.png');
    }
    create(){
        this.add.image(543, 405, 'sky0').setScale(0.7);
        
        this.rect = new Phaser.Geom.Rectangle(0, 0, 1086, 720);
        this.group = this.add.group({ key: 'cloud', frameQuantity: 15 });
        Phaser.Actions.RandomRectangle(this.group.getChildren(), this.rect);
        
        this.platforms = this.physics.add.staticGroup();
        this.wallpaper = this.physics.add.staticImage(543, 405, 'building').setScale(0.68);
        this.platforms.create(540, 100, 'ceiling').setScale(0.7).refreshBody();
        this.platforms.create(509, 185, 'separator1').setScale(0.7).refreshBody();
        this.platforms.create(512, 387, 'separator2').setScale(0.7).refreshBody();
        this.platforms.create(425, 341, 'platform2C').setScale(0.83).refreshBody();
        //this.platforms.create(35, 341, 'platform2L').setScale(0.83).refreshBody();
        this.platforms.create(5, 245, 'wall1').setScale(0.7).refreshBody();
        this.platforms.create(1077, 240, 'wall1').setScale(0.63).refreshBody();
        this.platforms.create(47, 445, 'wall1').setScale(0.63).refreshBody();
        this.platforms.create(1067, 445, 'wall1').setScale(0.63).refreshBody();
        this.platforms.create(651, 545, 'platform1C').setScale(0.83).refreshBody();
        this.platforms.create(88, 545, 'platform1L').setScale(0.83).refreshBody();
        this.platforms.create(141, 635, 'wall0').setScale(2.74).refreshBody();
        this.platforms.create(1000, 635, 'wall0').setScale(2.74).refreshBody();
        this.platforms.create(651, 715, 'platform0').setScale(0.83).refreshBody();
        this.paint= this.add.image(579,230,'paint');
        new Employer(this, 585, 657, 'employee').anims.play('l', true);
        new Employer(this, 755, 463, 'employee').anims.play('l', true);
        new Employer(this, 380, 463, 'employee').anims.play('l', true);
        new Employer(this, 820, 245, 'employee').anims.play('l', true);
        new Employer(this, 300, 245, 'employee').anims.play('l', true);
        
        missions2.push(this.a = this.add.image(585,607, 'missionj2'));
        missions2.push(this.b = this.add.image(755,413, 'missionj2'));
        missions2.push(this.c =this.add.image(380,413, 'missionj2'));
        missions2.push(this.d =this.add.image(820,195, 'missionj2'));
        missions2.push(this.e =this.add.image(300,195, 'missionj2'));
        missions1.push(this.f =this.add.image(585,607, 'missionj1'));
        missions1.push(this.g =this.add.image(755,413, 'missionj1'));
        missions1.push(this.h =this.add.image(380,413, 'missionj1'));
        missions1.push(this.i =this.add.image(820,195, 'missionj1'));
        missions1.push(this.j =this.add.image(300,195, 'missionj1'));
        averias.push(this.averiaplanta1= new Averias(this, 400, 600,'plantani', 'plant', 0, 4).setScale(0.5).refreshBody());
        averias.push(this.averiaplanta2= new Averias(this, 520, 298,'printerAnim', 'printer', 0, 8).setScale(0.67).refreshBody());
        averias.push(this.averiaplanta3= new Averias(this, 550, 400,'bookshelfAnim', 'bookshelf', 0, 4).setScale(0.67).refreshBody());
		player1 = new Player(this, 600, 1000, 'robot1', 'stop1');
        player2 = new Player(this, 200, 1000, 'robot2', 'stop2');
        for (var i = 0; i < missions1.length; i++){
			missions1[i].setVisible(false);
			missions2[i].setVisible(false);
		}
		var msg = {
					name : 'coordenadas',
		}
		conn.send(JSON.stringify(msg));
		conn.onmessage = function(msg) {
			if(msg.data == "Desconexion"){
				conn3.close();
				conn4.close();
				conn2.close();
				global.scene.start('ConexionOff' , { Web: conn });
			}else{
				console.log("WS message: " + msg.data);
	        	var message = JSON.parse(msg.data)
	        	if(message.diferenciador == "inicialmente"){
					player1.x = message.mias;
		        	player2.x = message.suyas;
		        	console.log(message.a);
		        	console.log(message.b);
		        	missions1[message.a].setVisible(true);
			        missions2[message.b].setVisible(true);
	        	}
	        	if(message.diferenciador == "arreglado"){
					averias[message.averia].a = false;
	                averias[message.averia].body.enable = false;
	                averias[message.averia].anims.play(averias[message.averia].key[1], true);
				}
			}       	
        }	
        button1 = this.physics.add.staticImage(0, 0, 'interaction').setScale(0.5).setVisible(false).setScale(0.67);
        button2 = this.physics.add.staticImage(0, 0, 'interaction2').setScale(0.5).setVisible(false).setScale(0.67);
        this.physics.add.collider(player1, player2, function (player1, player2){
            if(player2.x>player1.x){
                player2.setAccelerationX(50000);
                player1.setAccelerationX(-50000);
            }else{
                player2.setAccelerationX(-50000);
                player1.setAccelerationX(50000);
            }
            timer;  
        });
        this.physics.add.collider(player1, this.platforms);
        this.physics.add.collider(player2, this.platforms);
        for(let i=0; i<averias.length; i++){
            this.physics.add.collider(this.platforms, averias[i]);
        }  

        this.physics.world
        /*keyPeriod.on("down", function(){
            for(let i=0; i<averias.length; i++){  
                if ((player2.x < averias[i].x+85) && (player2.x > averias[i].x-85) && (player2.y > averias[i].y-85) && (player2.y < averias[i].y+20) && averias[i].a==true){
                    cursors.enabled = false; 
                    player2.body.enable = false;   
                    averias[i].a = false;
                    averias[i].body.enable = false;
                    averias[i].anims.play(averias[i].key[1], true);
                    console.log(averias[i].a, averias[i].sprite);
                }
            }
            for(let i=0; i<missions2.length; i++){  
                if ((player2.x < missions2[i].x+85) && (player2.x > missions2[i].x-85) && (player2.y > missions2[i].y-85) && (player2.y < missions2[i].y+120) && (missions2[i].visible==true)){
                    newpos=true;
                    timep2 += 5000;
                }
            }
        });*/
        keyE.on("down", function(){
            for(let i=0; i<averias.length; i++){  
                if ((player1.x < averias[i].x+85) && (player1.x > averias[i].x-85) && (player1.y > averias[i].y-85) && (player1.y < averias[i].y+20) && averias[i].a==true){
                    keyW.enabled=false;
                    keyA.enabled=false;
                    keyD.enabled=false; 
                    player1.body.enable = false;
                    if(i == 0){
						av1 = 0
					}
					if(i == 1){
						av2 = 0
					}
					if(i == 2){
						av3 = 0
					}
                    var msg = {
						name : 'arreglado',
						dato : i,
					}
					conn.send(JSON.stringify(msg));	   
                    //console.log(averias[i].a, averias[i].sprite);
                }

            }
            for(let i=0; i<missions1.length; i++){  
                if ((player1.x < missions1[i].x+85) && (player1.x > missions1[i].x-85) && (player1.y > missions1[i].y-85) && (player1.y < missions1[i].y+120) && (missions1[i].visible==true)){
		            for(let i=0; i<missions1.length; i++){
		                missions1[i].setVisible(false);
		            }
		            for(let i=0; i<missions2.length; i++){
		                missions2[i].setVisible(false);
		            }
		            do{
		                var a = Math.round(Phaser.Math.Between(0, missions1.length-1));
		                var b = Math.round(Phaser.Math.Between(0,missions2.length-1));
		            }while(a==b);
		            missions1[a].setVisible(true);
					missions2[b].setVisible(true);
					timep1 += 500;
					timep2 -= 500;
		            var msg = {
						name : 'misiones',
						dato1 : a,
						dato2 : b,
					}
					conn4.send(JSON.stringify(msg));					
                }
            }
        });    
        tiempoJ1=this.add.image(-100, -100, 'tiempoJ1').setScale(1.3);
		tiempoJ1_2=this.add.image(-100, -100, 'tiempoJ1_2').setScale(1.3);
		tiempoJ1_3=this.add.image(-100, -100, 'tiempoJ1_3').setScale(1.3);
		tiempoJ2=this.add.image(-100, -100, 'tiempoJ2').setScale(1.3);
		tiempoJ2_2=this.add.image(-100, -100, 'tiempoJ2_2').setScale(1.3);
		tiempoJ2_3=this.add.image(-100, -100, 'tiempoJ2_3').setScale(1.3); 
		this.style = { font: "30px OCR A", fill: "#000000" };
		text1=this.add.text(100, 20,'J1: ',this.style); 
        text2=this.add.text(930, 20,'J2: ',this.style);
    }
    update(time, delta){
		timeelapsed++;
        text1.setText('J1: ' + Math.round(timep1- timeelapsed));
        text2.setText('J2: ' + Math.round(timep2- timeelapsed));
		if(Math.round(timep1- timeelapsed)>2000){
			tiempoJ1.x=50;tiempoJ1.y=40;
			tiempoJ1_2.x=-100;tiempoJ1_2.y=-100;
			tiempoJ1_3.x=-100;tiempoJ1_3.y=-100;
		}else if(Math.round(timep1- timeelapsed)>1000){
			tiempoJ1.x=-100;tiempoJ1.y=-100;
			tiempoJ1_2.x=50;tiempoJ1_2.y=40;
			tiempoJ1_3.x=-100;tiempoJ1_3.y=-100;
		}else{
			tiempoJ1.x=-100;tiempoJ1.y=100;
			tiempoJ1_2.x=-100;tiempoJ1_2.y=-100;
			tiempoJ1_3.x=50;tiempoJ1_3.y=40;
		}
		
		if(Math.round(timep2- timeelapsed)>2000){
			tiempoJ2.x=880;tiempoJ2.y=40;
			tiempoJ2_2.x=-100;tiempoJ2_2.y=-100;
			tiempoJ2_3.x=-100;tiempoJ2_3.y=-100;
		}else if(Math.round(timep2- timeelapsed)>1000){
			tiempoJ2.x=-100;tiempoJ2.y=-100;
			tiempoJ2_2.x=880;tiempoJ2_2.y=40;
			tiempoJ2_3.x=-100;tiempoJ2_3.y=-100;
		}else{
			tiempoJ2.x=-100;tiempoJ2.y=100;
			tiempoJ2_2.x=-100;tiempoJ2_2.y=-100;
			tiempoJ2_3.x=880;tiempoJ2_3.y=40;
		}
		
        button1.x=player1.x;
        button1.y=player1.y - 50;
        button1.setVisible(false);
        /*button2.x=player2.x;
        button2.y=player2.y - 50;
        button2.setVisible(false);*/


		for(let i=0; i<averias.length; i++){
            if ((player1.x < averias[i].x+85) && (player1.x > averias[i].x-85) && (player1.y > averias[i].y-85) && (player1.y < averias[i].y+20) && averias[i].a==true){
                button1.x=player1.x;
                button1.y=player1.y - 50;
                button1.setVisible(true);
            }
        }
        /*for(let i=0; i<averias.length; i++){
            if ((player2.x < averias[i].x+85) && (player2.x > averias[i].x-85) && (player2.y > averias[i].y-85) && (player2.y < averias[i].y+20) && averias[i].a==true){
                button2.x=player2.x;
                button2.y=player2.y - 50;
                button2.setVisible(true);
            }
        }*/
        
        
        for(let i=0; i<missions1.length; i++){
            if ((player1.x < missions1[i].x+85) && (player1.x > missions1[i].x-85) && (player1.y > missions1[i].y-85) && (player1.y < missions1[i].y+120) && (missions1[i].visible==true)){
                button1.x=player1.x;
                button1.y=player1.y - 50;
                button1.setVisible(true);
            }  
        }

        /*for(let i=0; i<missions2.length; i++){
            if ((player2.x < missions2[i].x+85) && (player2.x > missions2[i].x-85) && (player2.y > missions2[i].y-85) && (player2.y < missions2[i].y+120) && (missions2[i].visible==true)){
                button2.x=player2.x;
                button2.y=player2.y - 50;
                button2.setVisible(true);
            }  
        }*/

        //Control of the clouds
        this.children = this.group.getChildren();

        Phaser.Actions.IncXY(this.children, 1, 0);
        Phaser.Actions.WrapInRectangle(this.children, this.rect);
   
        conn4.onclose = function(){					
			conn2.close();
			conn3.close();
			if(finalmalo == true){
				console.log("malo");
				global.scene.start('GameOver', { Web: conn });
			}
			if(final1 == true){
				console.log("J1");
				global.scene.start('Gamej1', { Web: conn });
			}
			if(final2 == true){
				console.log("J2");
				global.scene.start('Gamej2', { Web: conn });
			}			
		}
		
        //console.log(time);
        if (timeelapsed > timep1){
			final2 = true;
			conn4.close();
        }
        if(timeelapsed > timep2){
			final1 = true;
			conn4.close();
        }
       for(let h = 0; h<averias.length; h++){
            if(averias[h].a == true){
                this.cont++;
                //console.log(this.cont);
            }if(this.cont == averias.length  && timeelapsed > (this.error)){
				finalmalo = true;
				conn4.close();       
            }
        }
        this.cont = 0;
        if(timeelapsed > this.error){
			this.error += 500; 
            var msg = {
				name : 'random',
				averia1: av1,
				averia2: av2,
				averia3: av3,
			}
			conn3.send(JSON.stringify(msg));                        
        }

        /*if (keyA.isDown)
        {
            player1.flipX = true;
            player1.setVelocityX(-400);

            player1.anims.play(player1.key[0], true);
        }

        else if (keyD.isDown)
        {
            player1.flipX = false;
            player1.setVelocityX(400);

            player1.anims.play(player1.key[0], true);
        }
        else
        {
            player1.setVelocityX(0);
            player1.anims.play(player1.key[1]);
        }
        if (keyW.isDown && player1.body.touching.down)
        {
            player1.setVelocityY(-500);
        }

        if (cursors.left.isDown)
        {
            player2.flipX = true;
            player2.setVelocityX(-400);

            player2.anims.play(player2.key[0], true);
        }
        else if (cursors.right.isDown)
        {
            player2.flipX = false;
            player2.setVelocityX(400)

            player2.anims.play(player2.key[0], true);
        }
        else
        {
            player2.setVelocityX(0);
            player2.anims.play(player2.key[1]);
        }
        if (cursors.up.isDown && player2.body.touching.down)
        {
            player2.setVelocityY(-500);
        }*/
        if(conn4.readyState === conn4.OPEN){
			conn4.onmessage = function(msg){
				for(let i=0; i<missions1.length; i++){
			    	missions1[i].setVisible(false);
			    }
			    for(let i=0; i<missions2.length; i++){
			    	missions2[i].setVisible(false);
			    }
				var message = JSON.parse(msg.data);
				console.log(message);
				if(message.diferenciador == "misiones"){
				missions1[message.b].setVisible(true);
		        missions2[message.a].setVisible(true);
                timep1 -= 500;
                timep2 += 500;
				}
			}			
		}
		
		if(conn.readyState === conn.CLOSED){
			global.scene.start('ConexionServerOff');			
		} 
		
        if(conn3.readyState === conn3.OPEN){
			conn3.onmessage = function(msg) {
	        	console.log("WS message: " + msg.data);
	        	var message = JSON.parse(msg.data)
	        	if(message.diferenciador == "averias"){
					posi = message.posicion;					
					if(posi == 0){
						av1 = 1
					}
					if(posi == 1){
						av2 = 1
					}
					if(posi == 2){
						av3 = 1
					}
					averias[posi].anims.play(averias[posi].key[0], true);
		            averias[posi].body.enable = true;
		            collider = global.physics.add.collider(averias[posi], player1, function no(){player1.velocityX = 0}, null, this);
		            averias[posi].a = true;	
	        	}if(message.diferenciador == "cierre"){
					console.log("desconectado otro jugador");
					conn.close();
					global.scene.start('GameOver');
				}
	        }	
		}
        if(conn2.readyState === conn2.OPEN){
			if (keyA.isDown)
	        {
				player1.flipX = true;
	            player1.setVelocityX(-400);
	            player1.anims.play(player1.key[0], true);
	            var msg1 = {
						name : 'izquierda',
						datox : player1.x,
						datoy : player1.y,
				}
				conn2.send(JSON.stringify(msg1));
	        }
	        else if (keyD.isDown)
	        {
				player1.flipX = false;
	            player1.setVelocityX(400);
	            player1.anims.play(player1.key[0], true);
	            var msg = {
						name : 'derecha',
						datox : player1.x,
						datoy : player1.y,
				}
				conn2.send(JSON.stringify(msg));
	        }
	        else
	        {
				player1.setVelocityX(0);
	            player1.anims.play(player1.key[1]);
				var msg = {
						name : 'parado',
						datox : player1.x,
						datoy : player1.y,
				}
				conn2.send(JSON.stringify(msg));
	        }
	        if (keyW.isDown && player1.body.touching.down)
	        {
				player1.setVelocityY(-1000);
				player1.anims.play(player1.key[1]);
	            var msg = {
						name : 'arriba',
						datox : player1.x,
						datoy : player1.y,
				}
				conn2.send(JSON.stringify(msg));
	        }
		}
        
        
        conn2.onmessage = function(msg) {
    	var message = JSON.parse(msg.data)
    	if(message.diferenciador == "movimiento"){
        	switch (message.name) {
  				case 'izquierda':
						player2.flipX = true;
            			player2.setVelocityX(-400);
           				player2.anims.play(player2.key[0], true);  
           				player2.x = message.finalx;	
           				player2.y = message.finaly;			
    			break;
  				case 'derecha':
						player2.flipX =false;
            			player2.setVelocityX(400);
           				player2.anims.play(player2.key[0], true);
           				player2.x = message.finalx;	
           				player2.y = message.finaly;
    			break;
  				case 'arriba':
  						player2.setVelocityY(-500);
           				player2.anims.play(player2.key[0], true);
           				player2.x = message.finalx;	
           				player2.y = message.finaly;
    			break;
  					case 'parado':
  						player2.setVelocity(0);
            			player2.anims.play(player2.key[1]);
            			player2.x = message.finalx;	
           				player2.y = message.finaly;
    				break;
				}
			}       
    	}
    }
}


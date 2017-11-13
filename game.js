var keys;
			var mysound,PP,OP,OK,PK,OG,PG,BG,gov,intro;
            intro = document.createElement("video");
            intro.style.display="none";
            intro.setAttribute("preload", "auto");
            intro.setAttribute("controls", "none"); 
            document.getElementById("cbody").appendChild(intro);
            intro.src="intro.mp4";
			BG = new effects("FS/BR.mp3");
			OP = new effects("FS/psh3.wav"); 
			gov = new effects("FS/GOV.mp3"); 
			mysound = new effects("FS/spin_200ms_05.wav");
			PP = new effects("FS/psh1.wav"); 
			PK = new effects("FS/kick_H_09.wav");
			PG = new effects("FS/block_L_05.wav"); 
			OG = new effects("FS/block_L_04.wav");
			OK = new effects("FS/kick_M_05.wav"); 
			OP = new effects("FS/psh3.wav"); 
			var images={};
			var sources ={
				gaurd_left:"im/guard_left.png",
				gaurd_right:"im/guard_right.png",
				kick_left:"im/kick_left.png",
				kick_right:"im/kick_right.png",
				punch_left:"im/punch_left.png",
				punch_right:"im/punch_right.png",
				start_left:"im/start_left.png",
				start_right:"im/start_right.png",
				walk1_left:"im/walk1_left.png",
				walk1_right:"im/walk1_right.png",
				walk2_left:"im/walk2_left.png",
				walk2_right:"im/walk2_right.png",
				x:"im/x.jpg",
				y:"im/y.jpg"
				};
				var loadImages = function(){
					var loaded=0;
					var size=0;
					for(var i in sources){
						if(sources.hasOwnProperty(i))size++;
					}
					for(var j in sources){
						images[j]=new Image();
						images[j].onload=function(){
							if(++loaded>=size){
								initialize();
							}
						};
						images[j].src=sources[j];
					}
				};
			//canvas 
			var mainArea = {
				canvas:document.createElement("canvas"),
				background:"im/y.jpg",
				start:function(){
					this.canvas.width=800;
					this.canvas.height=600;
					this.context=this.canvas.getContext("2d");
					document.querySelector("#cbody").appendChild(this.canvas);
				},
				clear:function(){
					var img=new Image();
					img.src=this.background;
					this.context.drawImage(img, 1, 1);
				}
			};
			//First screen
			var startScreen = {
				start:function(){
					this.options = ["Start Fight","Insructions","About"];
					this.index=0;
					this.interval=setInterval(checkOpt,150);
					 //Sound looping during the game.
				    BG.sound.setAttribute("loop","none");
				    BG.play();
					//mainArea.backgroundSrc=""; //set background for the startScreen background
				},
				stop:function(){
					clearInterval(this.interval);
				},
				instruction:function(){
					this.timer=setInterval(inst,30);
				},
				back:function(){
					mainArea.background="im/y.jpg";
					clearInterval(this.timer);
					BG.stop();
					this.start();
				},
				about:function(){
					this.timer=setInterval(about,33);
				},
				gameover:function(){
					this.timer=setInterval(gameOver,33);
				}
			};
			var checkOpt = function (){
				var ctx= mainArea.context;
					mainArea.clear();
					ctx.font="30px Comic Sans MS";
					ctx.textAlign = "left";
				for(var i = 0 ; i<3 ; i++){
					if(startScreen.index==i){
                        ctx.strokeStyle="red";
                        ctx.lineWidth=3;
                        ctx.strokeText(startScreen.options[i],70,100*(i+2))
                    }
					ctx.fillStyle="white";
					ctx.fillText(startScreen.options[i],70,100*(i+2));
				}
				//check keys
				if(keys&&keys[38])
					startScreen.index=(startScreen.index-1+3)%3;
				else if(keys&&keys[40])
					startScreen.index=(startScreen.index+1)%3;
				else if(keys&&keys[13]){
					//on selecting option
					if(startScreen.index===0){
						startScreen.stop();
						var p = prompt("player 1 name") || "Player1";
						var o = prompt("player 2 name") || " player2";
						gameArea.start(p,o);
					}
					if(startScreen.index==1){
						startScreen.stop();
						startScreen.instruction();
					}
					if(startScreen.index==2){
						startScreen.stop();
						startScreen.about();
					}
				}
			};
			var inst = function(){
						var ctx = mainArea.context;
						var y=250;
						startScreen.stop();
						mainArea.clear();
						ctx.textAlign="left";
						ctx.font="30px Impact";
						ctx.fillStyle="white";
						ctx.fillText("Player 1 controls",100,y);
						ctx.font="20px Serif";
						ctx.fillText("W :moves the charachter up",100,y+25);
						ctx.fillText("A :moves the charachter Left",100,y+50);
						ctx.fillText("D :moves the charachter Right",100,y+75);
						ctx.fillText("V :Punch the enemy",100,y+100);
						ctx.fillText("B :Kick the enemy",100,y+125);
						ctx.fillText("N :Block the incoming hits",100,y+150);
						
						ctx.fillStyle="white";
						ctx.font="30px Impact";
						ctx.fillText("Player 2 controls",400,y);
						ctx.font="20px Serif";
						ctx.fillText("arrow up :moves the charachter up",400,y+25);
						ctx.fillText("arrow left :moves the charachter Left",400,y+50);
						ctx.fillText("arrow right :moves the charachter Right",400,y+75);
						ctx.fillText("home key :Punch the enemy",400,y+100);
						ctx.fillText("end key :kick the enemy",400,y+125);
						ctx.fillText("pg dn key :Block the incoming hits",400,y+150);
						if(keys&&keys[27]){
							startScreen.back();
						}
			};
			var about = function(){
						var ctx = mainArea.context;
						var y=225;
						startScreen.stop();
						mainArea.clear();
						ctx.textAlign="left";
						ctx.font="40px Impact";
                        ctx.strokeStyle="green";
                        ctx.lineWidth=2;
						ctx.fillStyle="white";
						ctx.fillText("Multimedia Project #2" ,50,y-55);
                        ctx.strokeText("Multimedia Project #2" ,50,y-55);
						ctx.font="25px Serif";
                        ctx.fillStyle="yellow";
						ctx.fillText("Created by :" ,100,y-10);
                        ctx.fillStyle="white";
						ctx.fillText("Ahmed Matter" ,100,y+25);
						ctx.fillText("Aser aboelkheir" ,100,y+50);
						ctx.fillText("Omar Elrayes" ,100,y+75);
						ctx.fillText("Monica Ayad" ,100,y+100);
						ctx.fillText("Monica Swiras" ,100,y+125);
						ctx.fillText("Abderlrahman Sharaf" ,100,y+150);
						ctx.fillText("Sherif Abdelmoneam" ,100,y+175);
						ctx.fillText("Mahmoud Gomaa" ,100,y+200);
						ctx.fillText("Osama Dabous" ,100,y+225);
						ctx.fillText("Mohamed Shaaban" ,100,y+250);
						ctx.fillText("Inspired by dr:khaled Elwzan" ,100,y+300);
						if(keys&&keys[27]){
							startScreen.back();
						}
						
			};
			//game area
			var gameArea = {
				start:function(p,o){
					this.myPlayer=new character(mainArea.canvas.width/3,mainArea.canvas.height-230,170,140,40,images.start_left,p,100);
					this.enemy=new character(mainArea.canvas.width*2/3,mainArea.canvas.height-230,170,140,mainArea.canvas.width-240,images.start_right,o,620);
					this.interval=setInterval(gameAnimation,33);
					mainArea.background="im/x.jpg";
				},
				stop:function(){
					clearInterval(this.interval);
				}
			};
			var gameAnimation=function(){
				if(keys&&keys[27]){
							gameArea.stop();
							startScreen.back();
						}
				var p=gameArea.myPlayer;
				var o=gameArea.enemy;
				if(keys&&keys[65]&&p.x>5){ //"A" move from right to left.
					p.x-=5;
						if(!p.walk&&!p.jump&&!p.punching&&!p.gaurd){
							p.image(images.walk1_left);
							p.walk=true;
						setTimeout(function(){
							p.image(images.start_left);
						},60);
						setTimeout(function(){
							p.walk=false;
						},200);
						}
				}
				if(keys&&keys[37]&&o.x>p.x+p.width+5){ //left arrow move from right to left.
					o.x-=5;
					if(!o.walk&&!o.jump&&!o.punching&&!o.gaurd){
						o.image(images.walk2_right);
						o.walk=true;
						setTimeout(function(){
							o.image(images.start_right);
						},60);
						setTimeout(function(){
							o.walk=false;
						},200);
						}
				}
				if(keys&&keys[68]&&p.x+p.width+5<o.x){ //"D" move from left to right.
					p.x+=5;
					if(!p.walk&&!p.jump&&!p.punching&&!p.gaurd){
						p.image(images.walk2_left);
						p.walk=true;
						setTimeout(function(){
							p.image(images.start_left);
						},60);
						setTimeout(function(){
							p.walk=false;
						},200);
						}
				}
				if(keys&&keys[39]&&o.x+o.width+5<mainArea.canvas.width){ //right arrow move from left to right.
					o.x+=5;
					if(!o.walk&&!o.jump&&!o.punching&&!o.gaurd){
						o.image(images.walk1_right);
						o.walk=true;
						setTimeout(function(){
							o.image(images.start_right);
						},60);
						setTimeout(function(){
							o.walk=false;
						},200);
						}
				}
				if(keys&&keys[87]&&!p.jump){
					var jump=p.y-50;
					p.jump=true;
					 //jump sound
					mysound.play();
					//gameArea.myPlayer.image="";
					timer=setInterval(function(){
						if(jump>=p.y){
							clearInterval(timer);
							timer=setInterval(function(){
								p.y+=2;
								if(jump<=p.y-50){
									clearInterval(timer);
									p.jump=false;
									//gameArea.myPlayer.image="";
								}
							},20);
						}
						else{
							p.y-=2;
						}
						}, 20);
				}
				if(keys&&keys[38]&&!o.jump){
					var jump2=o.y-50;
					o.jump=true;//jump sound
					mysound.play();
					//gameArea.myPlayer.image="";
					timer2=setInterval(function(){
						if(jump2>=o.y){
							clearInterval(timer2);
							timer2=setInterval(function(){
								o.y+=2;
								if(jump2<=o.y-50){
									clearInterval(timer2);
									o.jump=false;
									//gameArea.myPlayer.image="";
								}
							},20);
						}
						else{
							o.y-=2;
						}
						}, 20);
				}
				if(!p.gaurd&&!p.punching&&keys&&(keys[86]||keys[66])){
					p.punching=true;
					p.width+=20;
					if(keys[86]){
						//punch sound
					    	PP.play();
						p.image(images.punch_left);
						}
						if(keys[66]){ //kick sound
					        PK.play();
							p.image(images.kick_left);
						}
					if(!o.gaurd){
						//collision happens here
						if(keys[86]&&p.y<o.y+o.height&&p.y+p.height/2>o.y&&p.x+p.width>=o.x){//upper punch
							o.health-=5; 
							if(o.score>0){
							o.score-=5;}
							p.score+=5;
						}
						if(keys[66]&&p.y+p.height/2<o.y+o.height&&p.y+p.height>o.y&&p.x+p.width>=o.x){//lower kick
							o.health-=5;
							if(o.score>0){
							o.score-=5;}
							p.score+=5;
						}
					}
					setTimeout(function(){
						p.width-=20;
						p.image(images.start_left);
					},200);
					setTimeout(function(){
						p.punching=false;
						}, 300);
				}
				if(!o.gaurd&&!o.punching&&keys&&(keys[36]||keys[35])){
					o.punching=true;
					o.width+=20;
					o.x-=20;
					if(keys[36]){
							//Punch sound
					    OP.play();
						o.image(images.punch_right);
						}
						if(keys[35]){//kick sound
					        OK.play();
							o.image(images.kick_right);
						}
					if(!p.gaurd){
						//collision happens here
						if(keys[36]&&p.y<o.y+o.height&&p.y+p.height>o.y&&p.x+p.width>=o.x){//up punch
							p.health-=5;//Punch sound
					        OP.play();
							o.image(images.punch_right);
							if(p.score>0){
							p.score-=5;}
							o.score+=5;
						}
						if(keys[35]&&p.y<o.y+o.height&&p.y+p.height>o.y&&p.x+p.width>=o.x){//lower kick
							p.health-=5;//kick sound
					        OK.play();
							o.image(images.kick_right);
							if(p.score>>0){
							p.score-=5;}
							o.score+=5;
							//o.image=""; //kick image source
						}
					}
					setTimeout(function(){
						o.width-=20;
						o.x+=20;
						o.image(images.start_right);
						//o.image=""; //standard image
					},200);
					setTimeout(function(){
						o.punching=false;
						}, 300);
				}
				if(keys&&keys[78]&&!p.gaurd){
					//gaurd//guard sound
					PG.play();
					p.gaurd=true;
					p.image(images.gaurd_left);
				}
				if(keys&&!keys[78]&&p.gaurd){
					p.gaurd=false;
					p.image(images.start_left);
				}
				if(keys&&keys[34]&&!o.gaurd){
					//gaurd //guard sound
					OG.play();
					o.gaurd=true;
					o.image(images.gaurd_right);
				}
				if(keys&&!keys[34]&&o.gaurd){
					o.gaurd=false;
					o.image(images.start_right);
				}
				updateGame();
				if(p.health<=0||o.health<=0){
					gameArea.stop();//Sound for game over.
				gov.play();
				BG.stop();
					startScreen.gameover();
				}
			};
			//initiate function
			var initialize = function(){
				mainArea.start();
				startScreen.start();
			};
			
			function character(x,y,h,w,hx,im,n,sx){
			this.score=0;
			this.scorex=sx;
				this.height=h;
				this.width=w;
				this.x=x;
				this.y=y;
				this.healthx=hx;
				this.name=n;
				this.health=100;
				this.jump=false;
				this.punching=false;
				this.gaurd=false;
				this.walk=false;
				this.img=im;
				this.image=function(i){
					this.img=i;
					updateGame();
				};
				this.update=function(){
					var ctx=mainArea.context;
					ctx.font ="25px Impact";
					ctx.fillStyle = "white";
					ctx.fillText("score:"+this.score,this.scorex,110);
					ctx.fillStyle="red";
					ctx.fillRect(this.healthx,40,this.health*2,40);
					ctx.drawImage(this.img,
							this.x,
							this.y,
							this.width, this.height);
				};
			}
			var updateGame = function(){
				mainArea.clear();
				gameArea.myPlayer.update();
				gameArea.enemy.update();
			};
			var gameOver = function(){
				//mainArea.backgroundSrc=""; //set background for the gameOver background
				mainArea.clear();
				var ctx=mainArea.context;
				var winner;
				if(!gameArea.enemy.health){
					winner=gameArea.myPlayer.name;
					scorew=gameArea.myPlayer.score;
				}
				else{
					winner=gameArea.enemy.name;
					scorew=gameArea.enemy.score;
				}
				ctx.fillStyle="white";
				ctx.font="55px Comic Sans MS"; 
				ctx.textAlign="center";
				ctx.fillText("Game Over",mainArea.canvas.width/2,mainArea.canvas.height/2-50);
				ctx.font="45px Comic Sans MS"; 
				ctx.fillStyle="red";
				ctx.fillText(winner+" Wins",mainArea.canvas.width/2,mainArea.canvas.height/2+50);
				ctx.font="30px Arial"; 
				ctx.fillStyle="white";
				ctx.fillText("with score:"+scorew,mainArea.canvas.width/2,mainArea.canvas.height/2+100);
				ctx.fillStyle="white";
				ctx.font="30px Arial";
				ctx.fillText("Press Esc to play again",mainArea.canvas.width/2,mainArea.canvas.height/2+150);
				if(keys&&keys[27]){
							startScreen.back();
						}
			};
			document.onkeydown=function(e){
				e.preventDefault();
				keys= keys || [];
				keys[e.keyCode]=true;
			};
			document.onkeyup=function(e){
				keys[e.keyCode]=false;
			};
			function effects(src) {
                  this.sound = document.createElement("audio");
                  this.sound.src = src;
				  this.sound.style.display = "none";
                  this.sound.setAttribute("preload", "auto");
                  this.sound.setAttribute("controls", "none"); 
                  document.body.appendChild(this.sound);
                  this.play = function(){
                          this.sound.play();
			this.sound.currentTime=0;
                        };
                  this.stop = function(){
                  this.sound.pause();
				  };
		    }
            
            var playV = function(){
                if(intro.ended){
                    loadImages();
                }
                else{
                    mainArea.context.drawImage(intro,-10,0,mainArea.canvas.width+40,mainArea.canvas.height);
                    setTimeout(playV,20);
                }
            };
            intro.onloadeddata =function(){
                    intro.play();
                    mainArea.start();
                    playV();
            };
            
			/* end of code please write down any bug here 
				
				
				
			= Base js code by Mohamed shaaban,
			= Sprites created by Asser Aboelkeir,
			= Appending images in code by , Abd L-Rahman Sharaf and Osama Dabbous,
			= Appending hud by Monica Ayad and Monica Nabil,
			= Appending sound by Omar Magdy Elrayes,
			= Designing graphics by Sherif abdelmonaem and mahmoud gomaa,
			*/

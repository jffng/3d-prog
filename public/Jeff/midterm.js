			var container, stats;

			var camera, scene, renderer;

			var group, text, particles, geometry, materials = [], parameters, i, h, color;

			var targetRotation = 0;
			var targetRotationOnMouseDown = 0;

			var mouseX = 0;
			var mouseXOnMouseDown = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			function init() {

				//container = document.createElement( 'div' );

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, 150, 1000 );

				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );

				scene.add(new THREE.AmbientLight(0xffffff));
				// Get text from hash

				// var theText = "Jeffrey Jia-ming Ong";

				// var hash = document.location.hash.substr( 1 );

				// if ( hash.length !== 0 ) {

				// 	theText = hash;

				// }

				// var text3d = new THREE.TextGeometry( theText, {

				// 	size: 60,
				// 	height: 20,
				// 	curveSegments: 5,
				// 	font: "helvetiker"

				// });

				// text3d.computeBoundingBox();
				//  //var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );
				//  //var centerYOffset = -0.5 * ( text3d.boundingBox.max.y - text3d.boundingBox.min.y );

				// var textMaterial = new THREE.MeshPhongMaterial();
				// textMaterial.color = new THREE.Color(0xffffff);
				// text = new THREE.Mesh( text3d, textMaterial );

				// text.position.x = -250;
				// text.position.y = 150;
				// text.position.z = 0;

				// text.rotation.x = 0;
				// text.rotation.y = Math.PI * 2;

				// group = new THREE.Object3D();

				// var cubeGeometry = new THREE.CubeGeometry( 750, 10, 20 );
				// var cubeMaterial = new THREE.MeshPhongMaterial();
				// cubeMaterial.color = new THREE.Color(0xccffff)

				// cube = new THREE.Mesh( cubeGeometry, cubeMaterial);

				// cube.position.x = 135;
				// cube.position.y = 100;
				// cube.position.z = 10;

				// group.add( cube );


				// group.add( text );

				// scene.add( group );
				//group.translateZ(-100);

				light = new THREE.PointLight( 0xffffff, 1, 300 );
				light.position.set( 50, 100, 50 );
				scene.add( light );


				geometry = new THREE.Geometry();

				for ( i = 0; i < 20000; i ++ ) {

					var px = Math.random() * 7000 - 3500,
					py = Math.random() * 7000 - 3500,
					pz = Math.random() * 7000 - 3500.

					vertex = new THREE.Vertex(
						new THREE.Vector3(px, py, pz)
						);

					geometry.vertices.push( vertex );

				}

				parameters = [
					[ [1, 1, 0.5], 5 ],
					[ [0.95, 1, 0.5], 4 ],
					[ [0.90, 1, 0.5], 3 ],
					[ [0.85, 1, 0.5], 2 ],
					[ [0.80, 1, 0.5], 1 ]
				];

				for ( i = 0; i < parameters.length; i ++ ) {

					color = parameters[i][0];
					size  = parameters[i][1];

					materials[i] = new THREE.ParticleBasicMaterial( { size: size } );

					particles = new THREE.ParticleSystem( geometry, materials[i] );

					particles.rotation.x = Math.random() * 6;
					particles.rotation.y = Math.random() * 6;
					particles.rotation.z = Math.random() * 6;

					scene.add( particles );

				}
				
				renderer = new THREE.WebGLRenderer();
				var height = window.innerHeight;
				var width = window.innerWidth;
				renderer.setSize( width, height );

				document.body.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.body.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.body.addEventListener( 'touchmove', onDocumentTouchMove, false );

				window.addEventListener( 'resize', onWindowResize, false );
				renderer.setSize(window.innerWidth, window.innerHeight);
				document.body.appendChild( renderer.domElement );
			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				document.body.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.body.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.body.addEventListener( 'mouseout', onDocumentMouseOut, false );

				mouseXOnMouseDown = event.clientX - windowHalfX;
				targetRotationOnMouseDown = targetRotation;

			}

			function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;

				targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

			}

			function onDocumentMouseUp( event ) {

				document.body.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.body.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.body.removeEventListener( 'mouseout', onDocumentMouseOut, false );

			}

			function onDocumentMouseOut( event ) {

				document.body.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.body.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.body.removeEventListener( 'mouseout', onDocumentMouseOut, false );

			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
					targetRotationOnMouseDown = targetRotation;

				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
//					targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				//stats.update();

			}

			function render() {
				//group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
				
				 renderer.render( scene, camera );

			}
			init();
			animate();
		
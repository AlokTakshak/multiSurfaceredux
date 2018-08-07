import {ReactInstance, Location, Surface} from 'react-360-web';
import {Math as VRMath } from 'react-360-web';
function init(bundle, parent, options = {}) {
  const cameraDirection = [0, 0, -1];

 const r360 = new ReactInstance(bundle, parent, {
   fullScreen: true,
   frame: () => {
     const cameraQuat = r360.getCameraQuaternion();
     cameraDirection[0] = 0;
     cameraDirection[1] = 0;
     cameraDirection[2] = -1;
     VRMath.rotateByQuaternion(cameraDirection, cameraQuat);
   },
    ...options,
  });

  // Create three roots: two flat panels on the left and the right, and a Location
  // to mount rendered models in 3D space
  const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.6, 0);
  const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  rightPanel.setAngle(0.6, 0);
  r360.renderToSurface(
    r360.createRoot('TopPosts'),
    leftPanel,
  );
  r360.renderToSurface(
    r360.createRoot('CurrentPost'),
    rightPanel,
  );
// alert(r360._cameraQuat);
  r360.renderToLocation(
    r360.createRoot('ModelView'),
    new Location([0, -2, -10]),
  );

document.body.onkeydown=function(event){

      var a=cameraDirection[0],c=cameraDirection[2];
      // var distance = Math.sqrt(a*a+c*c);
      // if(distance<0.00001){
      //   a = 0;
      //   c =0;
      // }
      // else{
      //   a /= distance;
      //   c /= distance;
      // }
      if(event.code=='ArrowUp')
      {
          r360._cameraPosition[0] += a;
          r360._cameraPosition[2] += c;
      }
    else if (event.code=='ArrowDown')
      {
        r360._cameraPosition[0] -= a;
        r360._cameraPosition[2] -= c;
      }
     else if (event.code=='ArrowRight')
      {
        r360._cameraPosition[0] -= c;
        r360._cameraPosition[2] += a;
      }
       else if (event.code=='ArrowLeft')
      {
        r360._cameraPosition[0] += c;
        r360._cameraPosition[2] -= a;
      }
       else if (event.code=='KeyD')
      {
      r360._cameraPosition = [0, 0, 0];
      }
     }

  r360.compositor.setBackground('./static_assets/test.jpg');
}

window.React360 = {init};

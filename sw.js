self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});

self.addEventListener('push',event=>{
  let data={title:'منصة كفر الحمادية',body:'لديك إشعار جديد'};
  try{ if(event.data) data={...data,...event.data.json()} }catch(e){}
  event.waitUntil(
    self.registration.showNotification(data.title,{
      body:data.body,
      icon:'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 64 64\'%3E%3Crect width=\'64\' height=\'64\' rx=\'16\' fill=\'%23111827\'/%3E%3Ctext x=\'32\' y=\'41\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'28\' font-weight=\'700\' fill=\'white\'%3EKH%3C/text%3E%3C/svg%3E',
      badge:'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 64 64\'%3E%3Crect width=\'64\' height=\'64\' rx=\'16\' fill=\'%23111827\'/%3E%3C/svg%3E'
    })
  );
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
      for(const c of list){ if('focus' in c) return c.focus(); }
      if(self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});

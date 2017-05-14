/*a={t:'sss', z:{col:'#fff', cls:function (pass) {alert(this.cls.tm+'ee'+pass)}}};

c={k: 'ceva'};

a.z.cls.tm={'prop':33};

$k.extend(c, a, 3);

cWrite(a.z.cls.tm.prop=3);
cWrite(c.z.cls.tm.prop);

a.z.cls();
c.z.cls(3);

cWrite(a.z.cls===c.z.cls);

cWrite(a===c);*/

a={c:'t', d:{stuff:3, st2:undefined}};
a.d.st2=a;
a.ref=a;

b={};

$k.extend(b, a);

cWrite(a);

cWrite(b.d.st2.d===a.d.st2.d);
cWrite(b.d.st2===a.d.st2);
cWrite(b.ref.ref===a.ref.ref);
cWrite(b.ref===a.ref);
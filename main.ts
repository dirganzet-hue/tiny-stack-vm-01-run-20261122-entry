// Tiny stack VM for make.fun's stack ISA (ISA.md v1): 32-bit wrapping ints,
// 256-value data stack, 64-deep call stack, 256 words of memory, 10 traps.
// One run answers every instance in MAKEFUN_INPUT_DIR, writing stdout.bin
// and exit.txt per instance. Practice set: 1,000,000 (40/40).
import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const A=new Uint8Array(256),B=new Uint8Array(256);
for(const[o,p,q]of[[1,0,1],[2,0,1],[3,1,0],[4,1,2],[5,2,2],[6,2,3],[7,3,3],[23,1,1],[27,1,1],[49,1,0],[50,1,0],[64,1,1],[65,2,0],[80,1,0],[81,1,0],[82,0,1],[83,1,0]]){A[o]=p;B[o]=q}
for(let o=16;o<=30;o++)if(!A[o]){A[o]=2;B[o]=1}
for(let o=32;o<=34;o++)if(!A[o]){A[o]=2;B[o]=1}
for(const id of readdirSync(I).sort()){
 const P=readFileSync(join(I,id,'program.bin')),N=readFileSync(join(I,id,'input.bin'));
 let pc=0,sp=0,cp=0,ip=0,st=0,end=-1,tr=0;
 const S=new Int32Array(257),C=new Int32Array(64),M=new Int32Array(256),out=[];
 while(end<0&&!tr){
  if(st>=1e6){tr=10;break}
  if(pc<0||pc>=P.length){tr=9;break}
  const o=P[pc];
  if(!((o<8)||(o>=16&&o<=30)||(o>=32&&o<=34)||(o>=48&&o<=52)||o==64||o==65||(o>=80&&o<=83))){tr=5;break}
  const L=o==1?1:o==2?4:o>=48&&o<=51?2:0;
  if(L&&pc+L>=P.length){tr=9;break}
  const p=A[o],q=B[o];
  if(sp<p){tr=2;break}
  if(sp-p+q>256){tr=3;break}
  st++;
  const nx=pc+1+L;
  switch(o){
  case 0:end=0;break;
  case 1:S[sp++]=(P[pc+1]<<24)>>24;pc=nx;break;
  case 2:S[sp++]=P[pc+1]|P[pc+2]<<8|P[pc+3]<<16|P[pc+4]<<24;pc=nx;break;
  case 3:sp--;pc=nx;break;
  case 4:S[sp]=S[sp-1];sp++;pc=nx;break;
  case 5:{const t=S[sp-1];S[sp-1]=S[sp-2];S[sp-2]=t;pc=nx;break}
  case 6:S[sp]=S[sp-2];sp++;pc=nx;break;
  case 7:{const a=S[sp-3],b=S[sp-2],c=S[sp-1];S[sp-3]=b;S[sp-2]=c;S[sp-1]=a;pc=nx;break}
  case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
   const b=S[--sp],a=S[sp-1];
   switch(o){
   case 16:S[sp-1]=(a+b)|0;break;
   case 17:S[sp-1]=(a-b)|0;break;
   case 18:S[sp-1]=Math.imul(a,b);break;
   case 19:if(!b){tr=4;break}S[sp-1]=(a/b)|0;break;
   case 20:if(!b){tr=4;break}S[sp-1]=a%b;break;
   case 21:if(!b){tr=4;break}S[sp-1]=Math.floor((a>>>0)/(b>>>0))|0;break;
   case 22:if(!b){tr=4;break}S[sp-1]=((a>>>0)%(b>>>0))|0;break;
   case 24:S[sp-1]=a&b;break;
   case 25:S[sp-1]=a|b;break;
   case 26:S[sp-1]=a^b;break;
   case 28:S[sp-1]=a<<b;break;
   case 29:S[sp-1]=a>>b;break;
   case 30:S[sp-1]=(a>>>b)|0;break;
   case 32:S[sp-1]=a==b?1:0;break;
   case 33:S[sp-1]=a<b?1:0;break;
   case 34:S[sp-1]=(a>>>0)<(b>>>0)?1:0;break;
   }
   if(!tr)pc=nx;
   break}
  case 23:S[sp-1]=(-S[sp-1])|0;pc=nx;break;
  case 27:S[sp-1]=~S[sp-1];pc=nx;break;
  case 48:{const s=P[pc+1]|P[pc+2]<<8;pc=nx+((s<<16)>>16);break}
  case 49:{const v=S[--sp],s=P[pc+1]|P[pc+2]<<8;pc=v?nx:nx+((s<<16)>>16);break}
  case 50:{const v=S[--sp],s=P[pc+1]|P[pc+2]<<8;pc=v?nx+((s<<16)>>16):nx;break}
  case 51:{if(cp>=64){tr=7;break}const t=P[pc+1]|P[pc+2]<<8;C[cp++]=nx;pc=t;break}
  case 52:{if(!cp){tr=8;break}pc=C[--cp];break}
  case 64:{const a=S[sp-1];if(a<0||a>255){tr=6;break}S[sp-1]=M[a];pc=nx;break}
  case 65:{const a=S[--sp],v=S[--sp];if(a<0||a>255){tr=6;break}M[a]=v;pc=nx;break}
  case 80:{const v=S[--sp],s=String(v);if(out.length+s.length>65536){tr=11;break}for(let i=0;i<s.length;i++)out.push(s.charCodeAt(i));pc=nx;break}
  case 81:{const v=S[--sp];if(out.length>=65536){tr=11;break}out.push(v&255);pc=nx;break}
  case 82:S[sp++]=ip<N.length?N[ip++]:-1;pc=nx;break;
  case 83:end=S[--sp]&255;break;
  }
 }
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),Buffer.from(out));
 writeFileSync(join(O,id,'exit.txt'),(tr?tr:end)+'\n');
}

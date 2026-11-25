const app=document.querySelector('#app');
const state={tab:'outpatient',dept:'普通内科',doctor:'示例医生 A',slot:'上午 09:00–09:30',booked:false,paid:false,attached:true};
const link=(r,t)=>'<a class="next" href="#'+r+'">'+t+'</a>';
const row=(label,v)=>'<div class="row"><b>'+label+'</b><span>'+v+'</span></div>';
const choice=(r,t,v)=>'<a class="row" href="#'+r+'"><b>'+t+'</b><span class="pill">'+v+' ›</span></a>';
const act=(id,t)=>'<button data-action="'+id+'">'+t+'</button>';
const pt=()=>row('当前就诊人',state.attached?'体验就诊人 A':'未添加');
const headings={card:'就诊人管理',register:'在线挂号',schedule:'选择号源',confirm:'确认预约',records:'我的预约',pay:'门诊缴费',bill:'缴费明细',reports:'报告查询',report:'报告详情',inpatient:'住院服务',daily:'住院日清单',campus:'选择院区',doctor:'医生列表',consult:'在线问诊',guide:'智能导诊'};
function render(){
const r=location.hash.slice(1)||'home';let body='';
if(r==='home') {
 const tabs=[['outpatient','门诊'],['inpatient','住院'],['query','综合查询'],['convenience','便民服务']];
 const services={outpatient:[['card','我的就诊人','♙'],['campus','在线挂号','▦'],['pay','门诊缴费','¥'],['guide','智能导诊','✦']],inpatient:[['inpatient','住院服务','✚'],['daily','住院日清单','☷']],query:[['reports','报告查询','▤'],['records','挂号订单','▦'],['pay','缴费订单','¥']],convenience:[['guide','就医指引','✧'],['consult','在线问诊','◉']]};
 body='<div class="hero"><div class="hero-title">患者服务中心</div><strong>让就医更便捷</strong><p>预约、缴费与报告查询</p></div><a class="patient-card" href="#card"><span><small>我的就诊人</small><b>'+(state.attached?'体验就诊人 A':'添加就诊人')+'</b></span><span>就诊卡 ›</span></a><a class="search" href="#guide">✧ 智能导诊　│　⌕ 科室、医生、疾病</a><div class="quick"><a href="#campus"><i>▦</i><b>挂号服务</b><small>选择科室和号源</small></a><a href="#consult"><i>●</i><b>在线问诊</b><small>线上健康咨询</small></a><a href="#pay"><i>¥</i><b>门诊缴费</b><small>查看缴费记录</small></a></div><div class="notice">●　演示数据，操作不涉及真实诊疗或支付</div><section class="services"><div class="tabs">'+tabs.map(([id,label])=>'<button data-action="tab-'+id+'" aria-pressed="'+(state.tab===id)+'">'+label+'</button>').join('')+'</div><div class="services-grid">'+services[state.tab].map(([r,t,i])=>'<a href="#'+r+'"><span>'+i+'</span>'+t+'</a>').join('')+'</div></section>';
}
else if(r==='card')body=pt()+row('就诊卡',state.attached?'DEMO-CARD-A':'—')+act('attach',state.attached?'解除演示绑定':'添加虚构就诊人');
else if(r==='campus')body=choice('register','示范院区','进入');
else if(r==='register')body=pt()+['普通内科','普通外科','健康管理门诊'].map((d,i)=>act('dept'+i,d)).join('');
else if(r==='doctor')body=row('当前科室',state.dept)+act('doctorA','示例医生 A · 主任医师　查看号源')+act('doctorB','示例医生 B · 副主任医师　查看号源');
else if(r==='schedule')body=row('科室',state.dept)+row('医生',state.doctor)+row('门诊类型','普通门诊 · 示例排班')+['上午 09:00–09:30','下午 14:00–14:30'].map((v,i)=>act('slot'+i,v+'　可预约')).join('');
else if(r==='confirm')body=pt()+row('科室',state.dept)+row('医生',state.doctor)+row('时段',state.slot)+(state.attached?act('book','确认模拟预约'):link('card','先添加演示就诊人'));
else if(r==='records')body=state.booked?row('状态','已预约')+row('预约科室',state.dept)+row('预约时段',state.slot)+act('cancel','取消模拟预约'):'<section>暂无预约记录</section>'+link('campus','去预约');
else if(r==='pay')body=pt()+choice('bill','门诊服务费 · 示例项目',state.paid?'已缴费':'待缴费');
else if(r==='bill')body=row('费用项目','门诊服务费')+row('示例金额','¥10.00')+row('状态',state.paid?'已模拟缴费':'待缴费')+(state.paid?link('pay','查看缴费记录'):act('paid','模拟缴费'));
else if(r==='reports')body=pt()+(state.attached?choice('report','演示检验报告','已出具'):'<section>您尚未绑定就诊人，请先添加演示就诊人。</section>'+link('card','添加就诊人'));
else if(r==='report')body=row('报告编号','DEMO-RPT-A')+row('报告状态','已出具')+row('项目 A','示例数值 4.2')+row('项目 B','示例数值 8.0')+'<small>虚构数据，仅展示报告版式。</small>';
else if(r==='consult')body='<section><h2>在线问诊</h2><p>选择科室并了解图文咨询流程。</p>'+link('register','选择示例科室')+'</section>';
else if(r==='guide')body='<section><h2>智能导诊</h2><p>可根据就诊需求，进入科室列表了解服务。</p>'+link('register','查看示例科室')+'</section>';
else if(r==='inpatient')body=row('住院人','体验就诊人 B')+row('病区','示范病区')+choice('daily','住院日清单','查看明细');
else if(r==='daily')body=row('床位服务 · 样例','¥30.00')+row('护理服务 · 样例','¥10.00')+row('合计','¥40.00');
else {location.hash='home';return}
app.innerHTML=(r==='home'?'':'<a class="back" href="#home">‹ 服务首页</a><h1>'+headings[r]+'</h1>')+body;scrollTo(0,0);
}
app.onclick=e=>{let k=e.target.closest('button')?.dataset.action;if(!k)return;if(k.startsWith('tab-')){state.tab=k.slice(4);render()}else if(k.startsWith('dept')){state.dept=['普通内科','普通外科','健康管理门诊'][+k.slice(-1)];location.hash='doctor'}else if(k.startsWith('doctor')){state.doctor=k==='doctorA'?'示例医生 A':'示例医生 B';location.hash='schedule'}else if(k.startsWith('slot')){state.slot=['上午 09:00–09:30','下午 14:00–14:30'][+k.slice(-1)];location.hash='confirm'}else if(k==='book'){state.booked=true;location.hash='records'}else if(k==='cancel'){state.booked=false;render()}else if(k==='attach'){state.attached=!state.attached;render()}else if(k==='paid'){state.paid=true;render()}};
onhashchange=render;render();

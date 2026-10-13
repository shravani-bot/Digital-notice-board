const ADMIN_EMAIL="admin@gmail.com", ADMIN_PASSWORD="admin123";

function login(email,password){
 if(email===ADMIN_EMAIL && password===ADMIN_PASSWORD){
   localStorage.setItem("dn_admin","1"); return true;
 }
 return false;
}
function requireAdmin(){
 if(localStorage.getItem("dn_admin")!=="1") location.href="admin-login.html";
}
function logout(){localStorage.removeItem("dn_admin");location.href="admin-login.html";}
function getNotices(){
 return JSON.parse(localStorage.getItem("dn_notices")||"[]");
}
function addNotice(n){
 const a=getNotices(); a.unshift({...n,id:Date.now()});
 localStorage.setItem("dn_notices",JSON.stringify(a));
}
function removeNotice(i){
 const a=getNotices(); a.splice(i,1); localStorage.setItem("dn_notices",JSON.stringify(a));
}
function escapeHtml(s){
 return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function renderShell(title){
 document.getElementById("app").innerHTML=`
 <header class="topbar"><div><b>📢 Digital Notice Board</b><span>Admin Panel</span></div>
 <button class="logout" onclick="logout()">Logout</button></header>
 <div class="layout"><aside>
 <a href="dashboard.html">Dashboard</a><a href="add-notice.html">Add Notice</a>
 <a href="manage-notices.html">Manage Notices</a><a href="categories.html">Categories</a>
 <a href="users.html">Users</a><a href="index.html">View Notice Board</a>
 </aside><main><div class="page-title"><h1>${title}</h1></div><div id="content"></div></main></div>`;
}
function renderDashboard(){
 renderShell("Dashboard");
 const count=getNotices().length;
 document.getElementById("content").innerHTML=`
 <div class="welcome card"><h2>Welcome, Admin 👋</h2><p>You are logged in to the Digital Notice Board.</p></div>
 <div class="stats"><div class="stat"><b>${count}</b><span>Total Notices</span></div><div class="stat"><b>4</b><span>Categories</span></div><div class="stat"><b>1</b><span>Admin User</span></div></div>
 <div class="quick card"><h2>Quick Actions</h2><a class="btn" href="add-notice.html">+ Add Notice</a> <a class="btn secondary" href="manage-notices.html">Manage Notices</a></div>`;
}
function renderPublicNotices(){
 const box=document.getElementById("publicNotices"), a=getNotices();
 if(!a.length){box.innerHTML='<div class="empty">No notices have been published yet.</div>';return;}
 box.innerHTML=a.map(n=>`<article class="notice-card"><span class="badge">${escapeHtml(n.category)}</span><h2>${escapeHtml(n.title)}</h2><small>${escapeHtml(n.date)}</small><p>${escapeHtml(n.description)}</p></article>`).join("");
}

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(
        localStorage.getItem("loggedInUser") || "null"
    );

    const welcome = document.getElementById("welcome");
    const navigation = document.getElementById("navigation");

    if (user && welcome && navigation) {
        welcome.textContent = "Welcome back, " + user.name + "!";

        navigation.innerHTML = `
            <a href="index.html" class="btn small">Home</a>
            <a href="categories.html" class="btn small">Categories</a>
            <a href="user-register.html" class="btn small">Register</a>
            <a href="user-login.html" class="btn small">Login</a>
            <a href="admin-login.html" class="btn small">Admin Login</a>
            <button class="btn small" id="userLogout">Logout</button>
        `;

        document.getElementById("userLogout").addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }
});

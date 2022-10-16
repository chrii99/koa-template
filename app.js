const koa = require('koa');
const koaRouter = require('koa-router');
const render = require('koa-ejs');
const serve = require('koa-static');
const path = require('path');

const app = new koa();
const router = new koaRouter();

// ------------------------------------------------------

// serve files in static folder (css, js etc)
app.use(serve(__dirname, '/static'));

render(app, {
    root: path.join(__dirname, 'views'), // where the html sites are
    layout: 'layout', // use a layout for your website so code isn't repeated
    viewExt: 'html'
});

// Routes
router.get('/', index); // home directory

async function index(ctx) {
    await ctx.render('index'); // render the index.html file
}

// router middelware
app.use(router.routes()).use(router.allowedMethods()); 

app.listen(3000, () => console.log("Server Started...")); // open http://127.0.0.1:3000/
[a link to your YouTube video](https://youtu.be/ArIKptoG8Kw)

[a link to your Reveal presentation's deploy](https://rolling-scopes-school.github.io/ekoniuh-JS2020Q3/presentasion/)

[a link to the transcript of your presentation](https://github.com/rolling-scopes-school/ekoniuh-JS2020Q3/blob/presentasion/presentasion/README.md)


```
presentation: 'Web performance optimization'
```
	
## 2 slide

##### Hello my friends. My name is Yauheni. Today we will talk about Web performance optimization.

 This 10 ten-minute guide will cover following: 
 
1. What is Web performance optimization?
2. Optimization methods and tool
3. Why is website optimization important?

## 3.1 slide

### What is Web performance optimization?

Web performance is the objective measurements and the perceived user experience of load time and runtime. Web performance is how long a site takes to load, become interactive and responsive, and how smooth the content is during user interactions - is the scrolling smooth? are buttons clickable? Are pop-ups quick to load and display, and do they animate smoothly as they do so? Web performance includes both objective measurements like time to load, frames per second, and time to become interactive, and subjective experiences of how long it felt like it took the content to load.

## 4.1 slide

The web applications are becoming more and more complex every year, affecting them  productivity (продактивити). And the performance of the application affects its competitiveness   on the market. For this purpose web developers should be familiar with different performance improvement technicians. Main lines of reference work to improve the performance of the web application is

1. Animation performance and frame rate
2. Critical rendering path
3. CSS and JavaScript animation performance	
4. Lazy loading
5. Navigation and resource timings
6. Optimizing startup performance
7. Performance budgets
8. Performance fundamentals
9. Performance Monitoring: RUM vs synthetic monitoring
10. Populating the page: how browsers work
11. Recommended Web Performance Timings: How long is too long?
12. Understanding latency

Let's talk in more detail about each of the points...

## 5.1 slide

### Lazy loading

Lazy loading is a strategy to identify resources as non-blocking (non-critical) and load these only when needed. It's a way to shorten the length of the critical rendering path, which translates into reduced page load times.

Lazy loading can occur on different moments in the application, but it typically happens on some user interactions such as scrolling and navigation. 

## 5.2 slide

Lazy loading can be applied to multiple resources and through multiple strategies:   

- Code splitting
- Script type module
- Loading attribute

## 5.3 slide 

### Code splitting

JavaScript, CSS and HTML can be split into smaller chunks. This enables sending the minimal code required to provide value upfront, improving page-load times. The rest can be loaded on demand.

 - Entry point splitting: separates code by entry point(s) in the app
 - Dynamic splitting: separates code where dynamic import() statements are used

## 5.4 slide 

### Script type module

Any script tag with type="module" is treated like a JavaScript module and is deferred by default.

## 5.5 slide 

### Loading attribute

The loading attribute on an <img> element (or the loading attribute on an <iframe>) can be used to instruct the browser to defer loading of images/iframes that are off-screen until the user scrolls near them.

### Animation performance and frame rate

Users expect all interface interactions to be smooth and all user interfaces to be responsive.

## 6.1 slide

### Critical rendering path

The Critical Rendering Path is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript into pixels on the screen. Optimizing the critical render path improves render performance.

## 6.2 slide

### How does the browser rendering engine work?

In order to render content the browser has to go through a series of steps:
1. Document Object Model(DOM)
2. CSS object model(CSSOM)
3. Render Tree
4. Layout
5. Paint.

## 6.3 slide

- The Document Object Model (DOM) is created as the HTML is parsed.
- The HTML may request JavaScript, which may, in turn, alter the DOM.
- The HTML includes or makes requests for styles, which in turn builds the CSS Object Model (CSSOM).
- The browser engine combines the two to create the Render Tree.
- Layout determines the size and location of everything on the page.
- Once layout is determined, pixels are painted to the screen.

## 7.1 slide

### CSS and JavaScript animation performance

Animations are critical for a pleasurable user experience on many applications. There are many ways to implement web animations, such as CSS transitions/animations or JavaScript-based animations (using requestAnimationFrame())

In terms of performance, there is no difference between implementing an animation with CSS transitions or animations. 
Browsers are able to optimize rendering flows. In summary, we should always try to create our animations using CSS transitions/animations where possible. If your animations are really complex, you may have to rely on JavaScript-based animations instead.

## 8.1 slide

### Navigation and resource timings

Navigation timings are metrics measuring a browser's document navigation events. Resource timings are detailed network timing measurements regarding the loading of an application's resources.

## 9.1 slide

### Optimizing startup performance

An often overlooked aspect of app software development—even among those focusing on performance optimization—is startup performance. Regardless of platform, it's always a good idea to start up as quickly as possible. The more stuff you can do asynchronously, the better advantage your app can take of multicore processors.

## 9.2 slide 

There are other things beyond going asynchronous, which can help you improve your app's startup time. Here are a few of them:

- Download time
- GPU factors
- Data size

## 10.1 slide

### Performance budgets

A performance budget is a limit to prevent regressions. It can apply to a file, a file type, all files loaded on a page, a specific metric (e.g. Time to Interactive), a custom metric (e.g. Time to Hero Element), or a threshold over a period of time.   

## 10.2 slide

A budget exists to reflect your reachable goals. 

These goals can be:

- Timing based (e.g. Time to Interactive, First Contentful Paint).
- Quantity-based (e.g. amount of JS files/total image size).
- Rule-based (e.g. PageSpeed index, Lighthouse score).

A performance budget helps you protect optimal behavior for your current users while enabling you to tap into new markets and deliver custom experiences.

## 11.1 slide

### Performance fundamentals

Exists essential performance metrics:

- Responsiveness means how fast the system provides outputs (possibly multiple ones) in response to user inputs.
- Framerate is the rate at which the system changes pixels displayed to the user. 
- Memory usage
- Power usage

## 12.1 slide

### Performance Monitoring: RUM vs synthetic monitoring

Synthetic monitoring and real user monitoring (RUM) are two approaches for monitoring and providing insight into web performance.
Synthetic is well suited for catching regressions during development life cycles, especially with network throttling. 
RUM, on the other hand, provides real metrics from real users using the site or application. 

## 13.1 slide

### Recommended Web Performance Timings: How long is too long?

There are no clear set rules as to what constitutes a slow pace when loading pages, but there are specific guidelines for indicating content will load (1 second), idling (50ms), animating (16.7s) and responding to user input (50 to 200ms).

## 14.1 slide

### Understanding latency

 Latency is generally considered to be the amount of time it takes from when a request is made by the user to the time it takes for the response to get back to that user. 
 In terms of performance optimization, it's important to optimize to reduce causes of lacency and to test site performance emulating high latency to optimizer for users with lousy connections.

## 14.2 slide
To emulate the latency of a low bandwidth network, you can use developer tools and switch to a lower end network connection.

## 14.3 slide
Also, on the network tab, you can see how long each request took to complete.

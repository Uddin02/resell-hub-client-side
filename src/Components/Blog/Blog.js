import React from "react";

const Blog = () => {
  return (
    // <div className="my-10">
    //   <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mb-6 mx-auto ">
    //     <figure className="">
    //       <img
    //         className="w-full"
    //         src="https://placeimg.com/200/280/arch"
    //         alt="Album"
    //       />
    //     </figure>
    //     <div className="card-body">
    //       <h2 className="card-title">sadgjasdlhg</h2>
    //       <p className="text-justify">sadfas</p>

    //       <div className="card-actions justify-around">
    //         <p>Duration: sdfas</p>
    //         <Link>
    //           <button className="btn  btn-outline btn-info">
    //             View details
    //           </button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <section className=" dark:text-gray-100 ">
      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <h2 className="mb-12 text-4xl text-gray-800 font-bold leading-none text-center sm:text-5xl">
          Welcome to my blog section
        </h2>
        <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
          <div>
            <h3 className="font-bold text-md text-gray-800">
              1. What are the different ways to manage a state in a React
              application?
            </h3>
            <p className="mt-1 text-lg text-md text-justify text-gray-800">
              There are some different ways to manage state e.g. local state,
              global state, server state and url state etc. First of all
              useState hook is used to mananage local state. Secondly, to manage
              multiple components we use global state. Thirdly, server state
              manages external server data there are some tools like useEffect
              and useQuery. Finally, we can say about URL state which manage
              data exists in URL with pathname and query parameter.
              <br />
              Besides all of these there lots of state management tools now a
              days such as Redux, MobX, Akita, Recoil, and Zustand. Among them
              React Redux is so popular which is considered to a magic enabling
              straightfowward state connection.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              2. How does prototypical inheritance work?
            </h3>
            <p className="mt-1 text-lg text-gray-800 text-justify">
              The Prototypal Inheritance is a feature in javascript used to add
              methods and properties in objects. It is a method by which an
              object can inherit the properties and methods of another object.
              Traditionally, in order to get and set the [[Prototype]] of an
              object, we use Object.getPrototypeOf and Object. An inherited
              function acts just as any other property, When an inherited
              function is executed, the value of this points to the inheriting
              object, not to the prototype object where the function is an own
              property. The power of prototypes is that we can reuse a set of
              properties if they should be present on every instance —
              especially for methods.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              3. What is a unit test? Why should we write unit tests?
            </h3>
            <p className="mt-1 text-lg text-gray-800 text-justify">
              Unit testing is a component of test-driven development (TDD), a
              pragmatic methodology that takes a meticulous approach to building
              a product by means of continual testing and revision. This testing
              method is also the first level of software testing, which is
              performed before other testing methods such as integration
              testing. Unit tests are typically isolated to ensure a unit does
              not rely on any external code or functions. Testing can be done
              manually but is often automated.
              <br />
              <br />
              Unit tests save time and money. Usually, we tend to test the happy
              path more than the unhappy path. If you release such an app
              without thorough testing, you would have to keep fixing issues
              raised by your potential users.Well-written unit tests act as
              documentation for your code. Any developer can quickly look at
              your tests and know the purpose of your functions. It simplifies
              the debugging process.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              4. React vs. Angular vs. Vue?
            </h3>
            <p className="mt-1 text-lg text-gray-800 text-justify">
              React can be used as a UI library to render elements, without
              enforcing a specific project structure, and that’s why it’s not
              strictly a framework. React Elements are the smallest building
              blocks of React apps. They are more powerful than DOM elements
              because the React DOM makes sure to update them efficiently
              whenever something changes. Components are larger building blocks
              that define independent and reusable pieces to be used throughout
              the application. They accept inputs called props and produce
              elements that are then displayed to the user. React is based on
              JavaScript, but it’s mostly combined with JSX (JavaScript XML), a
              syntax extension that allows you to create elements that contain
              HTML and JavaScript at the same time.
              <br />
              <br />
              AngularJS, the original framework, is an MVC
              (Model-View-Controller) framework. But in Angular 2, there’s no
              strict association with MV*-patterns as it is also
              component-based. Projects in Angular are structured into Modules,
              Components, and Services. Each Angular application has at least
              one root component and one root module. Each component in Angular
              contains a Template, a Class that defines the application logic,
              and MetaData (Decorators). The metadata for a component tells
              Angular where to find the building blocks that it needs to create
              and present its view. Angular templates are written in HTML but
              can also include Angular template syntax with special directives
              to output reactive data and render multiple elements, among other
              things.
              <br />
              <br />
              The Vue.js core library focuses on the View layer only. It’s
              called a progressive framework because you can extend its
              functionality with official and third-party packages, such as Vue
              Router or Vuex, to turn it into an actual framework. Although Vue
              is not strictly associated with the MVVM (Model-View-ViewModel)
              pattern, its design was partly inspired by it. With Vue, you’ll be
              working mostly on the ViewModel layer, to make sure that the
              application data is processed in a way that allows the framework
              to render an up-to-date View. Vue’s templating syntax lets you
              create View components, and it combines familiar HTML with special
              directives and features. This templating syntax is preferred, even
              though raw JavaScript and JSX are also supported. Components in
              Vue are small, self-contained, and can be reused throughout the
              application. Single File Components (SFCs) with the .vue extension
              contain HTML, CSS, and JavaScript so that all relevant code
              resides in one file.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;

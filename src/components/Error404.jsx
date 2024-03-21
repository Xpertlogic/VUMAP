const Error404 = () => {
  return (
    <div>
      <h1>Oops!</h1>
      <h3>404 - Page Not Found</h3>
      <p>
        Sorry, the page you are looking for might have issue, had its name
        changed, or is temporarily unavailable.
      </p>
      <div>
        <a href="/" ref="noreferal">
          Go to Home Page
        </a>
      </div>
    </div>
  );
};

export default Error404;

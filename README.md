# Booking System

## Description

This Booking System allows the user to correctly add or remove bookings on an interface to facilitate the handling of them.

The project is aimed for people that work in any place where there is the need to take bookings. As it is pretty straight forward to use it allows people with little to no knowledge in computers to use it.

### What does it do?

The interface basically takes the user input on the requested fields and then it transports them to the correct booking segment of choice.

If a booking needs to be cancelled the user can easily check the checkbox that is created when a booking is submited and then click "Delete Booking"

### Technologies Used

For this project the technologies and tools used were:

- Vanilla JavaScript
- CSS
- HTML

### Challenges Faced

Being this my first project that I have done independently one could say everything was a challenge, but a welcome one.

It was pretty fun to design everything with pseudocode and then putting it into actual code.

One of the hardest challenges was to find a way to restore the place that is freed once a booking is cancelled. After a good time thinking over the solution, I am pretty happy how it resulted, even though it wasn't the first thing that came to mind on how to fix it. (Read more on **What I Learned** section.)

#

## Installation

As this was created with HTML, CSS and Vanilla JavaScript you dont actually need to install any packages.

The only thing I must say is that I use the "Better Commments" extension, so if you would like to see the comments highlighted on the main.js file, I recommend you to install it.

#

## Usage

The handling of the app is pretty straightforward.

The user needs to insert valid input fields to correctly add a booking:

- Name of the client must be First Name and Last Name
- The quantity of the people needs to be a number.
- The hour of the booking needs to be selected to submit the booking.
- The cellphone needs to comply with european standards (+xx xxx xxx xx xx);

Once a segment reached its max capacity, the segment cannot be chosen again until there is new space available. This will be signaled with the container turning red and the number of available space turning red.

To delete a function, a booking needs to be selected from its correspondent checkbox and then click the "Delete Booking" button. (There can be many bookings deleted at the same time.).

#

## What I learned

- Pseudocode is really important. It gives you the chance to portray how the project is going to be and also to construct it before even writing one line of actual code. The actual pseudocode that appears in the beggining of main.js is how the project started.

- Objects are pretty good to handle errors. To be able to use the keys and values from objects to sort out the erros that can be produced when the app is running is pretty important.

- Interpolation of variables is pretty important! You can interpolate a lot of things and that facilitates the code. The complicated thing is to start thinking abstractly, but once you got it, it improves your code so much

- To add a disabled attribute to an HTML element you have can use the setAttribute function but, it has to have the value of "". If not, you are going to find an error!

```
document.querySelector(`.option${hour}`).setAttribute("disabled", "");
```

- CSS Variables! They are pretty cool! You can put i.e your main color of the project on a variable on the root pseudo-class so you don't have to write it everytime!

```
:root {
 --main-color: rgba(211, 211, 211, 0.6);
}

.main-background {
   background-color: var(--main-color);
}
```

#

## Support

If some error should appear, you can contact through

- Twitter: @patoraedler
- Email: patoraedler@gmail.com

#

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate :)

#

## Author

Patrick Raedler.

#

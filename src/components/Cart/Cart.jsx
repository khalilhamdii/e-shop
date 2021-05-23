import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Reply } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no item in your shopping cart,
      <Link to="/" className={classes.link}>
        start adding some
      </Link>
      !
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            disabled
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return 'Loading...';

  return (
    <Box pb={12}>
      <Container>
        <div className={classes.toolBar} />
        <Box mt={12}>
          <Typography variant="h3" gutterBottom>
            Your Shopping Cart
          </Typography>
        </Box>
        <Box my={2}>
          <Button component={Link} to="/">
            <Reply fontSize="large" />
            Go back
          </Button>
        </Box>
        {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
      </Container>
    </Box>
  );
};

export default Cart;

<?php
    session_start();
    session_destroy();
    session_regenerate_id();
    session_write_close();
?>
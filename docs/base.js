var msg = Msg();

var msg2 = Msg(
{
    id: "foo",
    class: "bar",
    inner_x_class:"red !big",
    enable_titlebar: true
});

var msg3 = Msg(
{
    id: "boom",
    enable_inner_x:false,
    enable_outer_x:true
});

var msg4 = Msg(
{
    id: "boop"
});

var msg5 = Msg(
{
    id: "poop",
    lock: false
});

var msg6 = Msg(
{
    temp_disable_close: true,
    autoclose: true
});

var msg7 = Msg(
{
    class: 'no-padding',
    inner_x_class:'dark'
});

var msg_autoclose = Msg(
{
    autoclose:true,
    enable_inner_x:false,
    close_on_overlay_click:false,
    enable_titlebar:true
});

var msg_ox = Msg(
{
    enable_inner_x:false,
    enable_outer_x:true,
    close_on_overlay_click:false
});

var msg_delay = Msg(
{
    temp_disable_close:true,
    temp_disable_close_delay:3000,
    after_show: function(instance)
    {
        setTimeout(function()
        {
            instance.set("This had a 3 second delay before you could close it. Made to avoid closing the window by accident by misclicking. Default for this option is 1 second.");
        }, 2500);
    }
});

var msg_tst = Msg(
{
    temp_disable_close: true,
    temp_disable_click:true,
    before_toggle:function(instance)
    {
        console.log(instance.window.style.display);
    },
    after_toggle:function(instance)
    {
        console.log(instance.window.style.display);
    }
});

var msg_dclick = Msg(
{
    temp_disable_click:true,
    temp_disable_click_delay:3000
});

var msg_edit = Msg(
{
    clear_editables:true
});

var msg_dkeys = Msg(
{
    temp_disable_keys:true,
    temp_disable_keys_delay:3000
});

var msg_cust = Msg(
{
    class:"blue",
    overlay_class:"green",
    inner_x_class:"red"
});

var msg_default = Msg(
{
    class:"default",
    enable_outer_x:true
});

var msg_red = Msg(
{
    class:"red",
    enable_outer_x:true
});

var msg_blue = Msg(
{
    class:"blue",
    enable_outer_x:true
});

var msg_green = Msg(
{
    class:"green",
    enable_outer_x:true
});

var msg_black = Msg(
{
    class:"black",
    enable_outer_x:true
});

var msg_red_tb = Msg(
{
    class:"red",
    enable_outer_x:true,
    enable_titlebar:true
});

var msg_blue_tb = Msg(
{
    class:"blue",
    enable_outer_x:true,
    enable_titlebar:true
});

var msg_green_tb = Msg(
{
    class:"green",
    enable_outer_x:true,
    enable_titlebar:true
});

var msg_black_tb = Msg(
{
    class:"black",
    enable_outer_x:true,
    enable_titlebar:true
});

var msg_toy = Msg(
{
    id:"toy",
    persistent:false,
    after_show: function()
    {
        run_symmetric_harmony();
    },
    after_close: function(instance)
    {
        clearInterval(sym_interval);
    }
});

var msg_np = Msg(
{
    persistent:false,
    before_close:function(instance)
    {
        console.log(instance.window);
    },
    after_close:function(instance)
    {
        console.log(instance.window);
    }
});

var msg_nf = Msg(
{
    fade_in:false,
    fade_out:false
});

var msg_nfi = Msg(
{
    fade_in:false,
    fade_out:true,
    fade_out_duration:3000
});

var msg_nfo = Msg(
{
    fade_in:true,
    fade_out:false,
    fade_in_duration:3000
});

var msg_lf = Msg(
{
    fade_in_duration:1000,
    fade_out_duration:1000
});

var msg_ptop = Msg(
{
    position:"top"
});

var msg_pbottom = Msg(
{
    position:"bottom"
});

var msg_pleft = Msg(
{
    position:"left"
});

var msg_pright = Msg(
{
    position:"right"
});

var msg_ptright = Msg(
{
    position:"topright"
});

var msg_ptleft = Msg(
{
    position:"topleft"
});

var msg_pbright = Msg(
{
    position:"bottomright"
});

var msg_pbleft = Msg(
{
    position:"bottomleft"
});

var sm = "This is a simple message.";

var sc = "There are options to give elements different ids and classes. Then it's a matter of customizing and reusing parts however you want. By default, the titlebar is not enabled, I enabled it here to show that it's possible to have a titlebar."

var s = '<div class="heading">Where does it come from?</div><br>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.';

s += "<br><br><br><div class='heading'>Why do we use it?</div><br>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

s += "<br><br><br><div class='heading'>Where can I get some?</div><br>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

var s2 = "<div class='heading'>Bubbagum</div><br><img src='bubbagum.jpg'>";

var s3 = "<div class='btn' onclick='msg4.show(\"This window is on top.\")'>Open Another Window</div>";

var s4 = "This window will autoclose.";

var s5 = "Click the x in the top right corner of the overlay to close this. The position of the x buttons can be configured to be either on the left or right side.";

var s6 = "Try to close the window.";

var s7 = "<div class='btn' onclick=\"alert(\'This deactivated click events inside the window for 3 seconds. Made to avoid clicking things by accident. Default for this option is 1 second.\')\">Keep Clicking Me</div>";

var s8 = "When you focus the textarea and press Escape it will clear it. Press Escape again and it closes the window. It also works on inputs type=text.<br><br><textarea id='texta' rows=5>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</textarea><br><br>";

var s9 = "Keep Pressing Enter";

var s10 = "This is a customized window.";

var stoy = `<div class='heading'>Symmetric Harmony</div>By Tiffany Rayside<br><br><div><canvas id="canv"></canvas></div>`;

document.addEventListener("keyup", function(e)
{
    if(msg_dkeys.is_open())
    {
        if(e.keyCode === 13)
        {
            console.log('Enter pressed.');
            alert("This deactivated key actions on the document for 3 seconds. Made to avoid typing/activating things by accident. Default for this option is 1 second.")
        }
    }
});
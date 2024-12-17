<?php
/**
 * Template Name: EBC Sandbox
 */
 
?>
<?php get_header(); ?>
<section id="content" class="site-main width-hd xlarge-padding-top">
  <?php 
    $spotlight_data = g365_fn(['fn_name'=>'player_team_spotlight', 'arguments'=>[[], 'ebc-spotlight']]);
    $stat_leaderboards = $spotlight_data->stat_leaderboard;
//     echo "<pre>"; print_r($stat_leaderboards); echo "</pre>";
    echo '<div class="grid-x grid-margin-x small-up-2 medium-up-4 text-center profile-feature profile-widget player-spotlight">
    <div class="callout gray player-spotlight__section">
      <div class="orbit" role="region" aria-label="Stat Leaderboard" data-orbit>
        <div class="orbit-wrapper">
          <ul class="orbit-container">
            <h5 class="weight-bold small-margin-bottom player-spotlight__heading">Stat Leaderboard</h5>';
            foreach($stat_leaderboards as $stat_leaderboard):
              $default_img = 'http://grassroots365.com/wp-content/uploads/event-profiles/ebc_profile_placeholder.png';
              empty($stat_leaderboard->ev_profile_img) ? $profile_img = $default_img : $profile_img = $stat_leaderboard->ev_profile_img;
              $avg_pts = round($stat_leaderboard->avg_pts, 2);
            
            echo '<li class="is-active orbit-slide">
              <div class="player-spotlight__info">
                <div class="grid-y">
                    <h5 class="weight-bold no-margin-bottom">
                      <a class="spotlight__card--heading" href="https://grassroots365.com/player/'.$stat_leaderboard->player_url.'">'.$stat_leaderboard->player_name.'</a>
                    </h5>
                    <h5 class="weight-bold small-margin-bottom  player-spotlight__stat">'.$avg_pts.'<span> PTS</span></h5>
                </div>
                <div class="relative small-margin-top small-margin-bottom player-spotlight__pic">
                  <a href="https://grassroots365.com/player/'.$stat_leaderboard->player_url.'">
                    <img class="profile-image__player" src="'.$profile_img.'" alt="'.$profile_img.'">
                  </a>
                </div>
                <a class="player-spotlight__event" href="https://grassroots365.com/event/'.$stat_leaderboard->event_nickname.'" target="_blank">
                  <img class="profile-event-img tiny-margin-top" src="'.$stat_leaderboard->event_logo.'" alt="'.$stat_leaderboard->event_name.'">'.$stat_leaderboard->event_name.'
                </a>
              </div>
            </li>';
            endforeach;
          echo '</ul>
        </div>
        <nav class="orbit-bullets">';
          for($i = 0; $i < $num_count; $i++ ):
          echo '<button data-slide="'.$i.'"></button>';
          endfor;
        echo '</nav>
      </div>
    </div>
  </div>';
  ?>
<!--    <div class="grid-x grid-margin-x small-up-2 medium-up-4 text-center profile-feature profile-widget player-spotlight">
    <div class="callout gray player-spotlight__section">
      <div class="orbit" role="region" aria-label="Stat Leaderboard" data-orbit>
        <div class="orbit-wrapper">
          <ul class="orbit-container">
            <h5 class="weight-bold small-margin-bottom player-spotlight__heading">Stat Leaderboard</h5>
            <?php foreach($stat_leaderboards as $stat_leaderboard): 
//               empty($stat_leaderboard->ev_profile_img) ? $profile_img = g365_player_img_dir($stat_leaderboard->player_url, $stat_leaderboard->event_nickname, $stat_leaderboard->player_id) : $profile_img = $stat_leaderboard->ev_profile_img;
              empty($stat_leaderboard->ev_profile_img) ? $profile_img = $stat_leaderboard->ev_profile_img : $profile_img = $stat_leaderboard->ev_profile_img;
            ?>
            <li class="is-active orbit-slide">
              <div class="player-spotlight__info">
                <div class="grid-y">
                    <h5 class="weight-bold no-margin-bottom">
                      <a class="spotlight__card--heading" href="https://grassroots365.com/player/<?php echo $stat_leaderboard->player_url; ?>"><?php echo $stat_leaderboard->player_name; ?></a>
                    </h5>
                    <h5 class="weight-bold small-margin-bottom  player-spotlight__stat"><?php echo round($stat_leaderboard->avg_pts, 2); ?><span> PTS</span></h5>
                </div>
                <div class="relative small-margin-top small-margin-bottom player-spotlight__pic">
                  <a href="https://grassroots365.com/player/<?php echo $stat_leaderboard->player_url; ?>">
                    <img class="profile-image__player" src="<?php echo $profile_img; ?>" alt="<?php echo $profile_img; ?>">
                  </a>
                </div>
                <a class="player-spotlight__event" href="https://grassroots365.com/event/<?php echo $stat_leaderboard->event_nickname; ?>" target="_blank">
                  <img class="profile-event-img tiny-margin-top" src="<?php echo $stat_leaderboard->event_logo; ?>" alt="<?php echo $stat_leaderboard->event_name; ?>"><?php echo $stat_leaderboard->event_name; ?>
                </a>
              </div>
            </li>
            <?php endforeach; ?>
          </ul>
        </div>
        <nav class="orbit-bullets">
          <?php for($i = 0; $i < $num_count; $i++ ): ?>
          <button data-slide="<?php echo $i; ?>"></button>
          <?php endfor; ?>
        </nav>
      </div>
    </div>
  </div> -->
  <?php get_footer(); ?>
</section>